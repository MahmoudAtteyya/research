/**
 * Further reading — peer-reviewed PubMed records (from abstracts.json).
 * Shown as background reading, not as the study's reference list.
 */
export type Reading = {
  authors: string;
  title: string;
  journal: string;
  year: number;
  doi: string;
  pmid: string;
};

export const FURTHER_READING: Reading[] = [
  {
    authors: "Basrai M, Schweinlin A, Menzel J, et al.",
    title: "Energy Drinks Induce Acute Cardiovascular and Metabolic Changes Pointing to Potential Risks for Young Adults: A Randomized Controlled Trial",
    journal: "The Journal of Nutrition",
    year: 2019,
    doi: "10.1093/jn/nxy303",
    pmid: "30805607",
  },
  {
    authors: "Grasser EK, Miles-Chan JL, Charrière N, et al.",
    title: "Energy Drinks and Their Impact on the Cardiovascular System: Potential Mechanisms",
    journal: "Advances in Nutrition",
    year: 2016,
    doi: "10.3945/an.116.012526",
    pmid: "27633110",
  },
  {
    authors: "Costantino A, Maiese A, Lazzari J, et al.",
    title: "The Dark Side of Energy Drinks: A Comprehensive Review of Their Impact on the Human Body",
    journal: "Nutrients",
    year: 2023,
    doi: "10.3390/nu15183922",
    pmid: "37764707",
  },
  {
    authors: "Jagim AR, Harty PS, Tinsley GM, et al.",
    title: "International Society of Sports Nutrition Position Stand: Energy Drinks and Energy Shots",
    journal: "Journal of the International Society of Sports Nutrition",
    year: 2023,
    doi: "10.1080/15502783.2023.2171314",
    pmid: "36862943",
  },
  {
    authors: "Kaur A, Yousuf H, Ramgobin-Marshall D, et al.",
    title: "Energy Drink Consumption: A Rising Public Health Issue",
    journal: "Reviews in Cardiovascular Medicine",
    year: 2022,
    doi: "10.31083/j.rcm2303083",
    pmid: "35345250",
  },
  {
    authors: "Seifert SM, Schaechter JL, Hershorin ER, Lipshultz SE",
    title: "Health Effects of Energy Drinks on Children, Adolescents, and Young Adults",
    journal: "Pediatrics",
    year: 2011,
    doi: "10.1542/peds.2009-3592",
    pmid: "21321035",
  },
];
