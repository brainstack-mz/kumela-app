// src/data/provincesData.ts

export interface ProvinceData {
  name: string;
  districts: string[];
}

export const provincesData: ProvinceData[] = [
  {
    name: "Cabo Delgado",
    districts: [
      "Ancuabe", "Balama", "Chiúre", "Ibo", "Macomia", "Mecúfi", "Meluco",
      "Metuge", "Mocímboa da Praia", "Montepuez", "Mueda", "Muidumbe",
      "Namuno", "Nangade", "Palma", "Pemba"
    ]
  },
  {
    name: "Niassa",
    districts: [
      "Cuamba", "Lago", "Lichinga", "Majune", "Mandimba", "Marrupa",
      "Maúa", "Mavago", "Mecanhelas", "Mecula", "Metarica", "Muembe",
      "Nipepe", "Sanga"
    ]
  },
  {
    name: "Nampula",
    districts: [
      "Angoche", "Eráti", "Ilha de Moçambique", "Lalaua", "Larde", "Liúpo",
      "Malema", "Meconta", "Mecubúri", "Memba", "Mogincual", "Mogovolas",
      "Moma", "Monapo", "Mossuril", "Muecate", "Murrupula", "Nacala-Porto",
      "Nacala-a-Velha", "Nacarôa", "Nampula", "Rapale", "Ribáuè"
    ]
  },
  {
    name: "Zambézia",
    districts: [
      "Alto Molócuè", "Chinde", "Derre", "Gilé", "Gurué", "Ile", "Luabo",
      "Lugela", "Maganja da Costa", "Milange", "Mocuba", "Mopeia",
      "Morrumbala", "Mulevala", "Namacurra", "Namarroi", "Nicoadala",
      "Pebane", "Quelimane"
    ]
  },
  {
    name: "Tete",
    districts: [
      "Angónia", "Cahora-Bassa", "Changara", "Chifunde", "Chiuta", "Macanga",
      "Magoe", "Marávia", "Moatize", "Mutarara", "Tete", "Tsangano", "Zumbo"
    ]
  },
  {
    name: "Manica",
    districts: [
      "Bárue", "Chimoio", "Gondola", "Guro", "Macate", "Machaze", "Macossa",
      "Manica", "Mossurize", "Sussundenga", "Tambara", "Vanduzi"
    ]
  },
  {
    name: "Sofala",
    districts: [
      "Beira", "Búzi", "Caia", "Chemba", "Cheringoma", "Chibabava", "Dondo",
      "Gorongosa", "Machanga", "Maríngue", "Muanza", "Nhamatanda"
    ]
  },
  {
    name: "Inhambane",
    districts: [
      "Funhalouro", "Govuro", "Homoíne", "Inhambane", "Inharrime", "Inhassoro",
      "Jangamo", "Massinga", "Mabote", "Maxixe", "Morrumbene", "Panda",
      "Vilankulo", "Zavala"
    ]
  },
  {
    name: "Gaza",
    districts: [
      "Bilene", "Chibuto", "Chicualacuala", "Chigubo", "Chókwè", "Chongoene",
      "Guijá", "Limpopo", "Mabalane", "Manjacaze", "Mapai", "Massangena",
      "Massingir", "Xai-Xai"
    ]
  },
  {
    name: "Maputo Província",
    districts: [
      "Boane", "Magude", "Manhiça", "Marracuene", "Matutuíne", "Moamba",
      "Namaacha"
    ]
  },
  {
    name: "Maputo Cidade",
    districts: [
      "KaMpfumo", "Nlhamankulu", "KaMaxaquene", "KaMavota", "KaTembe", "KaNyaka"
    ]
  }
];
