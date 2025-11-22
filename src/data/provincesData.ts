// src/data/provincesData.ts

export interface ProvinceData {
  name: string;
  districts: string[];
}

export const provincesData: ProvinceData[] = [
  {
    name: "Nampula",
    districts: [
      "Nampula", "Angoche", "Eráti", "Ilha de Moçambique", "Lalaua", "Larde", "Liúpo",
      "Malema", "Meconta", "Mecubúri", "Memba", "Mogincual", "Mogovolas",
      "Moma", "Monapo", "Mossuril", "Muecate", "Murrupula", "Nacala-Porto",
      "Nacala-a-Velha", "Nacarôa", "Rapale", "Ribáuè"
    ]
  }
];
