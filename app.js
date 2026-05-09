// 定義一個非同步函數來獲取資料
async function fetchPokemon() {
    try {
        // 向 PokéAPI 發送請求 (這裡以皮卡丘為例，ID或英文名皆可)
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
        const data = await response.json();

        // 取得 HTML 中的容器
        const container = document.getElementById('pokemon-container');

        // 將取得的資料（圖片、名字）放入 HTML 中
        container.innerHTML = `
            <h2>${data.name.toUpperCase()}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>身高: ${data.height / 10} 公尺</p>
            <p>體重: ${data.weight / 10} 公斤</p>
        `;
    } catch (error) {
        console.error('讀取資料失敗:', error);
        document.getElementById('pokemon-container').innerHTML = '無法載入寶可夢資料。';
    }
}

// 執行函數
fetchPokemon();