export interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export interface ShippingOption {
  id: 'pac' | 'sedex' | 'free';
  name: string;
  deadline: string;
  price: number;
  isFree?: boolean;
}

export async function fetchCepAddress(cep: string): Promise<CepResponse | null> {
  const cleanCep = cep.replace(/\D/g, '');
  if (cleanCep.length !== 8) {
    return null;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    if (!response.ok) {
      throw new Error('Falha ao consultar CEP');
    }

    const data: CepResponse = await response.json();
    if (data.erro) {
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erro na consulta do CEP:', error);
    return null;
  }
}

export function calculateShippingOptions(
  uf: string,
  subtotal: number
): ShippingOption[] {
  const normalizedUf = uf.toUpperCase().trim();
  const isSudeste = ['SP', 'RJ', 'MG', 'ES'].includes(normalizedUf);
  const isSul = ['PR', 'SC', 'RS'].includes(normalizedUf);

  // Regra de Frete Grátis para pedidos acima de R$ 250
  if (subtotal >= 250) {
    return [
      {
        id: 'free',
        name: 'Frete Grátis Promocional',
        deadline: isSudeste ? '3 a 6 dias úteis' : '5 a 9 dias úteis',
        price: 0,
        isFree: true,
      },
      {
        id: 'sedex',
        name: 'SEDEX Express Prioritário',
        deadline: isSudeste ? '1 a 2 dias úteis' : '2 a 4 dias úteis',
        price: isSudeste ? 14.9 : 24.9,
      },
    ];
  }

  // Tabela de frete dinâmico por região
  let pacPrice = 18.9;
  let sedexPrice = 28.9;
  let pacDays = '4 a 8 dias úteis';
  let sedexDays = '1 a 3 dias úteis';

  if (isSudeste) {
    pacPrice = normalizedUf === 'SP' ? 12.9 : 15.9;
    sedexPrice = normalizedUf === 'SP' ? 19.9 : 24.9;
    pacDays = normalizedUf === 'SP' ? '2 a 4 dias úteis' : '3 a 6 dias úteis';
    sedexDays = normalizedUf === 'SP' ? '1 a 2 dias úteis' : '2 a 3 dias úteis';
  } else if (isSul) {
    pacPrice = 19.9;
    sedexPrice = 29.9;
    pacDays = '4 a 7 dias úteis';
    sedexDays = '2 a 4 dias úteis';
  } else {
    // Centro-Oeste / Nordeste / Norte
    pacPrice = 26.9;
    sedexPrice = 39.9;
    pacDays = '6 a 12 dias úteis';
    sedexDays = '3 a 6 dias úteis';
  }

  return [
    {
      id: 'pac',
      name: 'PAC Econômico Correios',
      deadline: pacDays,
      price: pacPrice,
    },
    {
      id: 'sedex',
      name: 'SEDEX Express Correios',
      deadline: sedexDays,
      price: sedexPrice,
    },
  ];
}
