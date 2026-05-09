// 監聽 Enter 鍵，讓使用者按 Enter 也能搜尋
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchPokemon();
    }
}

// 搜尋寶可夢的主要函數
async function searchPokemon() {
    // 取得使用者輸入的值，並轉成小寫 (API 規定必須是小寫)
    const input = document.getElementById('pokemon-input').value.toLowerCase().trim();
    const errorMessage = document.getElementById('error-message');
    const card = document.getElementById('pokemon-card');

    // 如果沒有輸入東西就返回
    if (!input) return;

    // 清除之前的錯誤訊息，並先隱藏卡片
    errorMessage.textContent = '搜尋中...';
    card.style.display = 'none';

    try {
        // 向 PokéAPI 發送請求
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        
        // 如果找不到該寶可夢 (例如打錯名字)
        if (!response.ok) {
            throw new Error('找不到這隻寶可夢，請確認名稱或 ID 是否正確！');
        }

        const data = await response.json();

        // --- 開始將資料填入 HTML 中 ---

        // 1. 名字
        document.getElementById('poke-name').textContent = data.name;

        // 2. 圖片 (使用高畫質的官方繪圖)
        const imgUrl = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;
        document.getElementById('poke-img').src = imgUrl;

        // 3. 基本資料 (API 預設單位是 0.1m 和 0.1kg，所以要除以 10)
        document.getElementById('poke-height').textContent = `${data.height / 10} m`;
        document.getElementById('poke-weight').textContent = `${data.weight / 10} kg`;

        // 4. 基礎能力值 (Stats)
        // data.stats 是一個陣列，索引 0 是 HP，1 是攻擊，2 是防禦
        document.getElementById('poke-hp').textContent = data.stats[0].base_stat;
        document.getElementById('poke-attack').textContent = data.stats[1].base_stat;
        document.getElementById('poke-defense').textContent = data.stats[2].base_stat;

        // 5. 屬性 (Types) - 因為寶可夢可能有多個屬性，需要用迴圈處理
        const typesContainer = document.getElementById('poke-types');
        typesContainer.innerHTML = ''; // 先清空舊的屬性
        data.types.forEach(typeInfo => {
            const span = document.createElement('span');
            span.className = 'type-badge';
            span.textContent = typeInfo.type.name;
            // 這裡可以進階設計：根據不同屬性給予不同背景顏色
            typesContainer.appendChild(span);
        });

        // 隱藏錯誤訊息，顯示填寫好資料的卡片
        errorMessage.textContent = '';
        card.style.display = 'block';

    } catch (error) {
        // 發生錯誤時的處理
        errorMessage.textContent = error.message;
        card.style.display = 'none';
    }
}

// 網頁剛載入時，預設先搜尋一隻寶可夢 (例如：妙蛙種子 1 號)
window.onload = () => {
    document.getElementById('pokemon-input').value = '1';
    searchPokemon();
    document.getElementById('pokemon-input').value = ''; // 搜尋完清空輸入框
};
