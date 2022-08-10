const fetchData = async () => {
    try {
      const warehouseId = "586291edd03b170013a588fe";
      const token = "4a248775b423c42d680d11f6271c6da5d513e231";
      const isQuarantine = true;
  
      const request = await fetch(
        `https://mosaic-production-api.herokuapp.com/api/warehouses/${warehouseId}/inventory?token=${token}&type=lot&isQuarantine=${isQuarantine}`
      );
      const jsonResponse = await request.json();
      if (!request.ok) {
        throw new Error(jsonResponse.message);
      }
      return jsonResponse.items;
    } catch (err) {
      throw err;
    }
  };
  
  const getData = async () => {
    const tableContainer = document.getElementById("data-table");
    try {
      let myItems = await fetchData();
  
      //TODO: Filter data
      const filteredData = myItems;
      const tableRows = filteredData.map(
        (item) => `<tr>
          <td>${item.name}</td>
          <td>${item.sku}</td>
          <td>${item.lotNumber}</td>
          <td>${item.isQuarantine}</td>
        </tr>`
      );
      tableContainer.innerHTML = tableRows.join(" ");
    } catch (err) {
      tableContainer.innerHTML = `<tr><td colspan="4">${err.message}</td>`;
    }
  };
  
  window.onload = (event) => getData();
  