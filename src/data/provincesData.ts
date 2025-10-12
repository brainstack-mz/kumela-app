export interface LocalityData {
  name: string;
}

export interface DistrictData {
  name: string;
  localities: LocalityData[];
}

export interface ProvinceData {
  name: string;
  districts: DistrictData[];
}

export const provincesData: ProvinceData[] = [
  {
    name: "Maputo Cidade",
    districts: [
      { name: "KaMpfumo", localities: [{ name: "Bairro Central" }, { name: "Polana Cimento" }, { name: "Malhangalene" }] },
      { name: "KaMaxakeni", localities: [{ name: "Maxaquene A" }, { name: "Maxaquene B" }, { name: "Maxaquene C" }] },
      { name: "KaMavota", localities: [{ name: "Zimpeto" }, { name: "Magoanine" }, { name: "Mahotas" }] },
      { name: "KaTembe", localities: [{ name: "Catembe" }, { name: "Chamissava" }, { name: "Inguide" }] },
    ],
  },
  {
    name: "Maputo Província",
    districts: [
      { name: "Boane", localities: [{ name: "Massaca" }, { name: "Mulotana" }, { name: "Guava" }] },
      { name: "Namaacha", localities: [{ name: "Namaacha Sede" }, { name: "Changalane" }] },
      { name: "Marracuene", localities: [{ name: "Marracuene Sede" }, { name: "Bobole" }, { name: "Macaneta" }] },
      { name: "Magude", localities: [{ name: "Magude Sede" }, { name: "Mugovolas" }] },
      { name: "Matutuíne", localities: [{ name: "Ponta do Ouro" }, { name: "Macia" }] },
    ],
  },
  {
    name: "Gaza",
    districts: [
      { name: "Chibuto", localities: [{ name: "Chibuto Sede" }, { name: "Mazivila" }] },
      { name: "Chokwe", localities: [{ name: "Chokwe Sede" }, { name: "Xilembene" }] },
      { name: "Macia", localities: [{ name: "Macia Sede" }, { name: "Chissano" }] },
      { name: "Bilene", localities: [{ name: "Bilene Sede" }, { name: "Chissano" }] },
    ],
  },
  {
    name: "Inhambane",
    districts: [
      { name: "Inhambane", localities: [{ name: "Inhambane Sede" }, { name: "Sibuto" }] },
      { name: "Maxixe", localities: [{ name: "Maxixe Sede" }, { name: "Macuze" }] },
      { name: "Vilanculos", localities: [{ name: "Vilanculos Sede" }, { name: "Bazaruto" }] },
      { name: "Chibuto", localities: [{ name: "Chibuto Sede" }, { name: "Chissano" }] },
    ],
  },
  {
    name: "Sofala",
    districts: [
      { name: "Beira", localities: [{ name: "Beira Sede" }, { name: "Chingussura" }] },
      { name: "Dondo", localities: [{ name: "Dondo Sede" }, { name: "Nhamatanda" }] },
      { name: "Marromeu", localities: [{ name: "Marromeu Sede" }, { name: "Chupanga" }] },
      { name: "Chibabava", localities: [{ name: "Chibabava Sede" }, { name: "Goonda" }] },
    ],
  },
  {
    name: "Nampula",
    districts: [
      { name: "Nampula", localities: [{ name: "Nampula Sede" }, { name: "Namicopo" }] },
      { name: "Mossuril", localities: [{ name: "Mossuril Sede" }, { name: "Moma" }] },
      { name: "Malema", localities: [{ name: "Malema Sede" }, { name: "Emanua" }] },
      { name: "Moma", localities: [{ name: "Moma Sede" }, { name: "Chalaua" }] },
    ],
  },
  {
    name: "Zambézia",
    districts: [
      { name: "Quelimane", localities: [{ name: "Quelimane Sede" }, { name: "Mocuba" }] },
      { name: "Gurué", localities: [{ name: "Gurué Sede" }, { name: "Namarroi" }] },
      { name: "Mocuba", localities: [{ name: "Mocuba Sede" }, { name: "Maganja da Costa" }] },
      { name: "Maganja da Costa", localities: [{ name: "Maganja da Costa Sede" }, { name: "Nante" }] },
    ],
  },
  {
    name: "Tete",
    districts: [
      { name: "Tete", localities: [{ name: "Tete Sede" }, { name: "Moatize" }] },
      { name: "Chingodzi", localities: [{ name: "Chingodzi Sede" }, { name: "Changara" }] },
      { name: "Macanga", localities: [{ name: "Macanga Sede" }, { name: "Doa" }] },
      { name: "Dôa", localities: [{ name: "Dôa Sede" }, { name: "Dôa" }] },
    ],
  },
  {
    name: "Manica",
    districts: [
      { name: "Chimoio", localities: [{ name: "Chimoio Sede" }, { name: "Vanduzi" }] },
      { name: "Manica", localities: [{ name: "Manica Sede" }, { name: "Machipanda" }] },
      { name: "Gondola", localities: [{ name: "Gondola Sede" }, { name: "Muda" }] },
      { name: "Macate", localities: [{ name: "Macate Sede" }, { name: "Zembe" }] },
    ],
  },
  {
    name: "Cabo Delgado",
    districts: [
      { name: "Pemba", localities: [{ name: "Pemba Sede" }, { name: "Mieze" }] },
      { name: "Metuge", localities: [{ name: "Metuge Sede" }, { name: "Mecúfi" }] },
      { name: "Ancuabe", localities: [{ name: "Ancuabe Sede" }, { name: "Lugela" }] },
      { name: "Macomia", localities: [{ name: "Macomia Sede" }, { name: "Mucojo" }] },
    ],
  },
  {
    name: "Niassa",
    districts: [
      { name: "Lichinga", localities: [{ name: "Lichinga Sede" }, { name: "Mandimba" }] },
      { name: "Cuamba", localities: [{ name: "Cuamba Sede" }, { name: "Metangula" }] },
      { name: "Mavago", localities: [{ name: "Mavago Sede" }, { name: "Sanga" }] },
      { name: "Eráti", localities: [{ name: "Eráti Sede" }, { name: "Mavago" }] },
    ],
  },
];
