// search
export const search = async (searchTerm) => {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info|extracts&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${searchTerm}`;
    const response = await fetch(url);
    const results = await response.json();
    return results.query.search;
  } catch (error) {
    console.log(error);
  }
};
