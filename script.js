const TRAIN_TYPES = [
    { rank: 5, name: "特急", color: "#CA2D73" },
    { rank: 4, name: "急行", color: "#05B08D" },
    { rank: 3, name: "区急", color: "#CFBC30" },
    { rank: 2, name: "快速", color: "#0F4E8C" },
    { rank: 1, name: "各停", color: "#818285" }
];
const COLOR_KEIO_MAGENTA = "#dd0077";
const COLOR_KEIO_BLUE = "#0F4E8C";

// ジオメトリ設定
const LINE_WIDTH = 13;  // 線路幅
const LINE_GAP = 19;    // 線路間隔
const OFFSET_X_STEP = 7;    // 線路斜めずらし量

const HEIGHT_KEIO = 1100;
const HEIGHT_SAGAMI = 700;
const HEIGHT_INO = 600;

// スラント角 (約70度)
const SLANT_ANGLE = Math.atan2(LINE_GAP, OFFSET_X_STEP);
const BEND_RADIUS_BASE = 40;

let STATIONS = [
    // Keio Line
    { id: "shinjuku", name: "新宿", num: 1, dist: 0, defaultRank: 5, group: "keio" },
    { id: "hatsudai", name: "初台", num: 2, dist: 70, defaultRank: 4, group: "keio" },
    { id: "hatagaya", name: "幡ヶ谷", num: 3, dist: 70, defaultRank: 4, group: "keio" },
    { id: "sasazuka", name: "笹塚", num: 4, dist: 70, defaultRank: 5, group: "keio" },
    { id: "daitabashi", name: "代田橋", num: 5, dist: 70, defaultRank: 1, group: "keio" },
    { id: "meidaimae", name: "明大前", num: 6, dist: 70, defaultRank: 5, group: "keio" },
    { id: "shimotaka", name: "下高井戸", num: 7, dist: 70, defaultRank: 2, group: "keio" },
    { id: "sakura", name: "桜上水", num: 8, dist: 70, defaultRank: 4, group: "keio" },
    { id: "kamikita", name: "上北沢", num: 9, dist: 70, defaultRank: 1, group: "keio" },
    { id: "hachiman", name: "八幡山", num: 10, dist: 70, defaultRank: 2, group: "keio" },
    { id: "roka", name: "芦花公園", num: 11, dist: 70, defaultRank: 1, group: "keio" },
    { id: "chitose", name: "千歳烏山", num: 12, dist: 70, defaultRank: 5, group: "keio" },
    { id: "sengawa", name: "仙川", num: 13, dist: 70, defaultRank: 3, group: "keio" },
    { id: "tsutsuji", name: "つつじヶ丘", num: 14, dist: 70, defaultRank: 4, group: "keio" },
    { id: "shibasaki", name: "柴崎", num: 15, dist: 70, defaultRank: 1, group: "keio" },
    { id: "kokuryo", name: "国領", num: 16, dist: 70, defaultRank: 1, group: "keio" },
    { id: "fuda", name: "布田", num: 17, dist: 70, defaultRank: 1, group: "keio" },
    { id: "chofu", name: "調布", num: 18, dist: 70, defaultRank: 5, group: "keio" },
    { id: "nishi-chofu", name: "西調布", num: 19, dist: 120, defaultRank: 2, group: "keio" },
    { id: "tobitakyu", name: "飛田給", num: 20, dist: 70, defaultRank: 2, group: "keio" },
    { id: "musashino", name: "武蔵野台", num: 21, dist: 70, defaultRank: 2, group: "keio" },
    { id: "tama-reien", name: "多磨霊園", num: 22, dist: 70, defaultRank: 2, group: "keio" },
    { id: "higashi-fuchu", name: "東府中", num: 23, dist: 70, defaultRank: 4, group: "keio" },
    { id: "fuchu", name: "府中", num: 24, dist: 90, defaultRank: 5, group: "keio" },
    { id: "bubaigawara", name: "分倍河原", num: 25, dist: 70, defaultRank: 5, group: "keio" },
    { id: "nakagawara", name: "中河原", num: 26, dist: 70, defaultRank: 3, group: "keio" },
    { id: "seiseki", name: "聖蹟桜ヶ丘", num: 27, dist: 70, defaultRank: 5, group: "keio" },
    { id: "mogusa", name: "百草園", num: 28, dist: 70, defaultRank: 3, group: "keio" },
    { id: "takahata", name: "高幡不動", num: 29, dist: 70, defaultRank: 5, group: "keio" },
    { id: "minamidaira", name: "南平", num: 30, dist: 90, defaultRank: 3, group: "keio" },
    { id: "hirayama", name: "平山城址公園", num: 31, dist: 70, defaultRank: 3, group: "keio" },
    { id: "naganuma", name: "長沼", num: 32, dist: 70, defaultRank: 3, group: "keio" },
    { id: "kitano", name: "北野", num: 33, dist: 70, defaultRank: 5, group: "keio" },
    { id: "keio-hachioji", name: "京王八王子", num: 34, dist: 120, defaultRank: 5, group: "keio" },
    // Sagamihara Line
    { id: "tamagawa", name: "京王多摩川", num: 35, dist: 70, defaultRank: 3, group: "sagami" },
    { id: "inadazutsumi", name: "京王稲田堤", num: 36, dist: 70, defaultRank: 5, group: "sagami" },
    { id: "yomiuri", name: "京王よみうりランド", num: 37, dist: 70, defaultRank: 3, group: "sagami" },
    { id: "inagi", name: "稲城", num: 38, dist: 70, defaultRank: 3, group: "sagami" },
    { id: "wakabadai", name: "若葉台", num: 39, dist: 70, defaultRank: 3, group: "sagami" },
    { id: "nagayama", name: "京王永山", num: 40, dist: 70, defaultRank: 5, group: "sagami" },
    { id: "tama-center", name: "京王多摩センター", num: 41, dist: 70, defaultRank: 5, group: "sagami" },
    { id: "horinouchi", name: "京王堀之内", num: 42, dist: 70, defaultRank: 3, group: "sagami" },
    { id: "osawa", name: "南大沢", num: 43, dist: 70, defaultRank: 5, group: "sagami" },
    { id: "tamasakai", name: "多摩境", num: 44, dist: 70, defaultRank: 3, group: "sagami" },
    { id: "hashimoto", name: "橋本", num: 45, dist: 70, defaultRank: 5, group: "sagami" },
    // Takao Line
    { id: "katakura", name: "京王片倉", num: 48, dist: 90, defaultRank: 5, group: "takao" },
    { id: "yamada", name: "山田", num: 49, dist: 60, defaultRank: 5, group: "takao" },
    { id: "mejiro", name: "めじろ台", num: 50, dist: 60, defaultRank: 5, group: "takao" },
    { id: "hazama", name: "狭間", num: 51, dist: 60, defaultRank: 5, group: "takao" },
    { id: "takao", name: "高尾", num: 52, dist: 60, defaultRank: 5, group: "takao" },
    { id: "takaosan", name: "高尾山口", num: 53, dist: 60, defaultRank: 5, group: "takao" },
    // Inokashira Line
    { id: "shibuya", name: "渋谷", num: 1, dist: 70, defaultRank: 4, group: "ino" },
    { id: "shinsen", name: "神泉", num: 2, dist: 70, defaultRank: 1, group: "ino" },
    { id: "komaba", name: "駒場東大前", num: 3, dist: 70, defaultRank: 1, group: "ino" },
    { id: "ikenoue", name: "池ノ上", num: 4, dist: 70, defaultRank: 1, group: "ino" },
    { id: "shimokita", name: "下北沢", num: 5, dist: 70, defaultRank: 4, group: "ino" },
    { id: "shindaita", name: "新代田", num: 6, dist: 70, defaultRank: 1, group: "ino" },
    { id: "higashimatsu", name: "東松原", num: 7, dist: 0, defaultRank: 1, group: "ino" },
    { id: "eifuku", name: "永福町", num: 9, dist: 0, defaultRank: 4, group: "ino" },
    { id: "nishieifuku", name: "西永福", num: 10, dist: 70, defaultRank: 1, group: "ino" },
    { id: "hamada", name: "浜田山", num: 11, dist: 70, defaultRank: 1, group: "ino" },
    { id: "takaido", name: "高井戸", num: 12, dist: 70, defaultRank: 1, group: "ino" },
    { id: "fujimigaoka", name: "富士見ヶ丘", num: 13, dist: 70, defaultRank: 1, group: "ino" },
    { id: "kugayama", name: "久我山", num: 14, dist: 70, defaultRank: 4, group: "ino" },
    { id: "mitakadai", name: "三鷹台", num: 15, dist: 70, defaultRank: 1, group: "ino" },
    { id: "inokashira", name: "井の頭公園", num: 16, dist: 70, defaultRank: 1, group: "ino" },
    { id: "kichijoji", name: "吉祥寺", num: 17, dist: 70, defaultRank: 4, group: "ino" }
];

let stationRanks = {};
let viewState = { scale: 0.3, x: 30, y: 30, isDragging: false };

window.onload = function() {
    checkDevice();
    initApp();
    initPanZoom();
};

// 関数: 機能
// デバイス検出
function checkDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent);
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 768;
    
    if (isMobile || isTablet || (hasTouchScreen && isSmallScreen)) {
        const warningElement = document.getElementById('mobile-warning');
        if (warningElement) {
            warningElement.style.display = 'flex';
        }
    }
}
// アプリ初期化
function initApp() {
    const elmCtrls = document.getElementById('controls');
    elmCtrls.innerHTML = "";
    const groups = { "keio": "京王本線", "sagami": "相模原線", "takao": "高尾線", "ino": "井の頭線" };
    for (let groupName in groups) {
        const elmGrpTitle = document.createElement('div');
        elmGrpTitle.className = 'line-group-title';
        elmGrpTitle.textContent = groups[groupName];
        elmCtrls.appendChild(elmGrpTitle);

        STATIONS.filter(s => s.group === groupName).forEach(station => {
            if (stationRanks[station.id] === undefined) {
                stationRanks[station.id] = station.defaultRank;
            }
            const elmCtrlStation = document.createElement('div');
            elmCtrlStation.className = 'station-control';
            
            if (station.group === "ino") {
                if (stationRanks[station.id] !== 1 && stationRanks[station.id] !== 4) {
                    stationRanks[station.id] = 1;
                }
                if (stationRanks[station.id] === 4) {
                    sliderValue = 1;
                } else {
                    sliderValue = 0;
                }
                elmCtrlStation.innerHTML = `
                    <div class="station-header">
                        <span class="station-name">${station.name}</span>
                        <span class="rank-value" id="label-${station.id}">${getRankName(stationRanks[station.id])}</span>
                    </div>
                    <input type="range" min="0" max="1" step="1" value="${sliderValue}" oninput="updateRank('${station.id}', this.value, '${groupName}')">
                `;
            } else {
                elmCtrlStation.innerHTML = `
                    <div class="station-header">
                        <span class="station-name">${station.name}</span>
                        <span class="rank-value" id="label-${station.id}">${getRankName(stationRanks[station.id])}</span>
                    </div>
                    <input type="range" min="1" max="5" value="${stationRanks[station.id]}" oninput="updateRank('${station.id}', this.value, '${groupName}')">
                `;
            }
            elmCtrls.appendChild(elmCtrlStation);
        });
    }
    drawMap();
}
// 駅ランク更新
function updateRank(stationId, rank, group) { 
    if (group == "ino") {
        if (parseInt(rank) === 1) {
            actualRank = 4;
        } else {
            actualRank = 1;
        }
        stationRanks[stationId] = actualRank;
        document.getElementById(`label-${stationId}`).innerText = getRankName(actualRank);
    } else {
        stationRanks[stationId] = parseInt(rank); 
        document.getElementById(`label-${stationId}`).innerText = getRankName(parseInt(rank)); 
    }
    drawMap(); 
}
// CSV出力
function exportCSV() {
    let csvData = "data:text/csv;charset=utf-8,id,name,num,dist,rank,group\n";
    STATIONS.forEach(s => {
        csvData += `${s.id},${s.name},${s.num},${s.dist},${stationRanks[s.id] ?? s.defaultRank},${s.group}\n`;
    });
    const csvLink = document.createElement("a");
    csvLink.href = encodeURI(csvData);
    csvLink.download = "keio_original_map.csv";
    csvLink.click();
}
// CSV入力
function importCSV(csvData) {
    const csvFile = csvData.files[0];
    if (!csvFile) {
        return;
    }
    const csvReader = new FileReader();
    csvReader.onload = e => { 
        const csvLines = e.target.result.split('\n');
        const importStation = [], importRank = {};
        for (let i = 1; i < csvLines.length; i++) {
            const csvElm = csvLines[i].trim().split(',');
            if (csvElm.length < 6) {
                continue;
            }
            importStation.push({ id: csvElm[0], name: csvElm[1], num: parseInt(csvElm[2]), dist: parseInt(csvElm[3]), defaultRank: parseInt(csvElm[4]), group: csvElm[5] });
            importRank[csvElm[0]] = parseInt(csvElm[4]);
        }
        if (importStation.length) {
            STATIONS = importStation;
            stationRanks = importRank;
            initApp();
        }
    };
    csvReader.readAsText(csvFile);
    input.value = '';
}
// ダウンロード(SVG形式)
function downloadSVG() {
    const elmSvg = document.getElementById('mapSvg');
    const svgLink = document.createElement('a');
    svgLink.href = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(elmSvg)], { type: "image/svg+xml;charset=utf-8" }));
    svgLink.download = "keio_original_map.svg";
    svgLink.click();
}
// ダウンロード(PNG形式)
function downloadPNG() {
    const elmPng = document.getElementById('mapSvg');
    const elmCanvas = document.createElement('canvas');
    elmCanvas.width = parseInt(elmPng.getAttribute("width"));
    elmCanvas.height = parseInt(elmPng.getAttribute("height"));
    const ctx = elmCanvas.getContext('2d');
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, parseInt(elmPng.getAttribute("width")), parseInt(elmPng.getAttribute("height")));
    const elmImage = new Image();
    elmImage.onload = () => {
        ctx.drawImage(elmImage, 0, 0);
        const pngLink = document.createElement('a');
        pngLink.href = elmCanvas.toDataURL("image/png");
        pngLink.download = "keio_original_map.png";
        pngLink.click();
    };
    elmImage.src = "data:image/svg+xml;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(new XMLSerializer().serializeToString(elmPng))));
}
// キャンバス操作
function initPanZoom() {
    const elmView = document.getElementById('viewport');
    const elmLayer = document.getElementById('canvas-layer');
    let mouseGrab = false, lx = 0, ly = 0;
    const app = () => {
        elmLayer.style.transform = `translate(${viewState.x}px, ${viewState.y}px) scale(${viewState.scale})`;
    };
    elmView.onmousedown = e => {
        mouseGrab = true;
        lx = e.clientX;
        ly = e.clientY;
        elmView.style.cursor = 'grabbing';
    };
    window.onmousemove = e => {
        if (mouseGrab) {
            viewState.x += e.clientX - lx;
            viewState.y += e.clientY - ly;
            lx = e.clientX;
            ly = e.clientY;
            app();
        }
    };
    window.onmouseup = () => {
        mouseGrab = false;
        elmView.style.cursor = 'grab';
    };
    elmView.onwheel = e => {
        e.preventDefault();
        viewState.scale = Math.min(Math.max(0.1, viewState.scale - e.deltaY * 0.001), 5.0);
        app();
    };
    app();
}
// キャンバス初期化
function resetView() {
    viewState = { scale: 0.3, x: 50, y: 50 };
    initPanZoom();
}
// 駅描画位置計算
function calculateGeometry() {
    const positions = {};

    // 京王本線
    let keioX = 100;
    const keioY = HEIGHT_KEIO;
    STATIONS.filter(s => s.group === 'keio').forEach(s => {
        keioX += s.dist;
        positions[s.id] = { x: keioX, y: keioY, layout: 'horizontal' };
    });

    const chofuPosition = positions['chofu'];
    const kitanoPosition = positions['kitano'];
    const meidaimaePosition = positions['meidaimae'];

    // 相模原線
    const lineCenter = Math.floor((TRAIN_TYPES.length - 1) / 2);
    const rKeioCurve = BEND_RADIUS_BASE + (lineCenter * LINE_GAP);
    const rSagamiCurve = BEND_RADIUS_BASE + ((4 - lineCenter) * LINE_GAP);

    const dyKeioCurve = rKeioCurve * (1 - Math.cos(SLANT_ANGLE));
    const dySagamiCurve = rSagamiCurve * (1 - Math.cos(SLANT_ANGLE));
    const dySagamiStraight = (HEIGHT_SAGAMI - (dyKeioCurve + dySagamiCurve)) / Math.sin(SLANT_ANGLE);
    const dxKeioCurve = rKeioCurve * Math.sin(SLANT_ANGLE);
    const dxSagamiCurve = rSagamiCurve * Math.sin(SLANT_ANGLE);
    const dxSagamiStraight = dxKeioCurve + (dySagamiStraight * Math.cos(SLANT_ANGLE)) + dxSagamiCurve;

    let sagamiX = chofuPosition.x + dxSagamiStraight;
    const sagamiY = HEIGHT_KEIO - HEIGHT_SAGAMI;
    STATIONS.filter(s => s.group === 'sagami').forEach(s => {
        sagamiX += s.dist;
        positions[s.id] = { x: sagamiX, y: sagamiY, layout: 'horizontal' };
    });

    positions._sagamiInfo = { dySagamiStraight };

    // 高尾線
    const rTakaoCurve = BEND_RADIUS_BASE;
    const dxTakaoCurve = rTakaoCurve * Math.sin(SLANT_ANGLE);
    const dyTakaoCurve = rTakaoCurve * (1 - Math.cos(SLANT_ANGLE));

    const xStraight = kitanoPosition.x + dxTakaoCurve;
    const yStraight = kitanoPosition.y - dyTakaoCurve;
    
    const takaoX = xStraight;
    let takaoY = yStraight;

    STATIONS.filter(s => s.group === 'takao').forEach(s => {
        takaoY -= s.dist;
        positions[s.id] = { x: takaoX + (yStraight - takaoY) / Math.tan(SLANT_ANGLE), y: takaoY, layout: 'rising_right' };
    });

    // 井の頭線
    const rInoCurve = BEND_RADIUS_BASE;

    const dyInoCurve = rInoCurve * (1 - Math.cos(SLANT_ANGLE));
    const dyInoStraight = (HEIGHT_INO - dyInoCurve) / Math.sin(SLANT_ANGLE);
    const dxInoCurve = rInoCurve * Math.sin(SLANT_ANGLE);
    const dxInoStraight = dxInoCurve + (dyInoStraight * Math.cos(SLANT_ANGLE));
    
    const xInoStraightTop = meidaimaePosition.x - dxInoStraight;
    const xInoStraightButtom = meidaimaePosition.x + dxInoStraight;

    let inoXTop = xInoStraightTop;
    const inoYTop = meidaimaePosition.y - HEIGHT_INO;     
    STATIONS.filter(s => s.group === 'ino' && s.num <= 7).reverse().forEach(s => {
        inoXTop -= s.dist;
        positions[s.id] = { x: inoXTop, y: inoYTop, layout: 'inokashira_flat' };
    });

    let inoXButtom = xInoStraightButtom;
    const inoYBottom = meidaimaePosition.y + HEIGHT_INO;
    STATIONS.filter(s => s.group === 'ino' && s.num >= 9).forEach(s => {
        inoXButtom += s.dist;
        positions[s.id] = { x: inoXButtom, y: inoYBottom, layout: 'inokashira_flat' };
    });

    positions._inoInfo = {
        center: { x: meidaimaePosition.x, y: meidaimaePosition.y },
        inoTop: { x: xInoStraightTop, y: inoYTop },
        inoButtom: { x: xInoStraightButtom, y: inoYBottom },
        length: dyInoStraight * 2,
        angle: SLANT_ANGLE,
    }

    return positions;
}
// 駅描画
function drawMap() {
    const elmMap = document.getElementById('mapSvg');
    elmMap.innerHTML = "";
    const positions = calculateGeometry();

    // マップサイズ計算
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    Object.values(positions).forEach(p => {
        if (p.x !== undefined && p.y !== undefined) {
            minX = Math.min(minX, p.x);
            maxX = Math.max(maxX, p.x);
            minY = Math.min(minY, p.y);
            maxY = Math.max(maxY, p.y);
        }
    });
    // 余白追加
    minX += 200; maxX += 0; minY -= 200; maxY += 300; 
    const paddingX = 400; const paddingY = 100;
    
    const width = (maxX - minX) + (paddingX * 2);
    const height = (maxY - minY) + (paddingY * 2);

    elmMap.setAttribute("width", width);
    elmMap.setAttribute("height", height);
    elmMap.setAttribute("viewBox", `0 0 ${width} ${height}`);

    const elmCanvas = document.createElementNS("http://www.w3.org/2000/svg", "g");
    elmCanvas.setAttribute("transform", `translate(${paddingX - minX}, ${paddingY - minY})`);
    elmMap.appendChild(elmCanvas);

    // --- 井の頭線 ---
    drawInokashiraLine(elmCanvas, positions);

    // 京王本線・相模原線・高尾線描画
    TRAIN_TYPES.forEach((type, index) => {
        const shiftKeioY = getShiftY(index);
        const shiftKeioX = getShiftX(index);

        const lineGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        lineGroup.setAttribute("stroke", type.color);
        lineGroup.setAttribute("stroke-width", LINE_WIDTH);
        lineGroup.setAttribute("fill", "none");

        // 相模原線
        const sagamiStations = STATIONS.filter(s => s.group === 'sagami');
        if (sagamiStations.length > 0) {
            const chofuPosition = positions['chofu'];
            const rKeioCurve = BEND_RADIUS_BASE + (index * LINE_GAP);
            
            const keioX = chofuPosition.x;
            const keioY = chofuPosition.y + shiftKeioY;
            
            const lengthStraight = positions._sagamiInfo.dySagamiStraight;
            const dxKeioCurve = rKeioCurve * Math.sin(SLANT_ANGLE);
            const dyKeioCurve = rKeioCurve * (1 - Math.cos(SLANT_ANGLE));
            const dxKeioStraight = keioX + dxKeioCurve;
            const dyKeioStraight = keioY - dyKeioCurve;
            const dxSagamiStraight = dxKeioStraight + lengthStraight * Math.cos(SLANT_ANGLE);
            const dySagamiStraight = dyKeioStraight - lengthStraight * Math.sin(SLANT_ANGLE);
            const rSagamiCurve = BEND_RADIUS_BASE + ((4 - index) * LINE_GAP);
            const dxSagamiCurve = rSagamiCurve * Math.sin(SLANT_ANGLE);
            const dySagamiCurve = rSagamiCurve * (1 - Math.cos(SLANT_ANGLE));
            
            const sagamiX = dxSagamiStraight + dxSagamiCurve;
            const sagamiY = dySagamiStraight - dySagamiCurve;

            let dataPath = `M ${keioX},${keioY} A ${rKeioCurve} ${rKeioCurve} 0 0 0 ${dxKeioStraight},${dyKeioStraight} L ${dxSagamiStraight},${dySagamiStraight} A ${rSagamiCurve} ${rSagamiCurve} 0 0 1 ${sagamiX},${sagamiY}`;
            sagamiStations.forEach((s, i) => {
                if (i === 0) {
                    return;
                }
                const p = positions[s.id];
                dataPath += ` L ${p.x + shiftKeioX},${p.y + shiftKeioY}`;
            });
            const elmPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            elmPath.setAttribute("d", dataPath);
            lineGroup.appendChild(elmPath);
        }

        // 高尾線
        const takaoStations = STATIONS.filter(s => s.group === 'takao');
        if (takaoStations.length > 0) {
            const kitanoPosition = positions['kitano'];
            const rTakaoCurve = BEND_RADIUS_BASE + shiftKeioY;
            const keioX = kitanoPosition.x;
            const keioY = kitanoPosition.y + shiftKeioY;
            const takaoX = keioX + rTakaoCurve * Math.sin(SLANT_ANGLE);
            const takaoY = keioY - rTakaoCurve * (1 - Math.cos(SLANT_ANGLE));
            
            let dataPath = `M ${keioX},${keioY} A ${rTakaoCurve} ${rTakaoCurve} 0 0 0 ${takaoX},${takaoY}`;
            const finalX = takaoX + (takaoY - positions[takaoStations[takaoStations.length - 1].id].y) / Math.tan(SLANT_ANGLE);
            dataPath += ` L ${finalX},${positions[takaoStations[takaoStations.length - 1].id].y}`;
            
            const elmPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            elmPath.setAttribute("d", dataPath);
            lineGroup.appendChild(elmPath);
        }

        // 京王本線
        let dataPath = "";
        STATIONS.filter(s => s.group === 'keio').forEach((s, i) => {
            const position = positions[s.id];
            const keioX = position.x + shiftKeioX;
            const keioY = position.y + shiftKeioY;
            if (i === 0) {
                dataPath += `M ${keioX},${keioY}`;
            } else {
                dataPath += ` L ${keioX},${keioY}`;
            }
        });
        const elmPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        elmPath.setAttribute("d", dataPath);
        lineGroup.appendChild(elmPath);

        elmCanvas.appendChild(lineGroup);
    });

    // 駅・バッジ描画 (井の頭線以外)
    STATIONS.filter(s => s.group !== 'ino').forEach(station => {
        const potision = positions[station.id];
        const rank = stationRanks[station.id];
        const isRank5 = (rank === 5);
        const stationNameLength = station.name.length * 32;

        if (potision.layout === 'horizontal') {
            const baseX = potision.x + getShiftX(4);
            const baseY = potision.y + (4 * LINE_GAP);
            if (isRank5) {
                const capsuleTopX = potision.x + getShiftX(0);
                const capsuleTopY = potision.y + getShiftY(0);
                const capsuleButtomX = potision.x + getShiftX(4);
                const capsuleButtomY = potision.y + getShiftY(4);

                const capsuleCx = (capsuleTopX + capsuleButtomX) / 2;
                const capsuleCy = (capsuleTopY + capsuleButtomY) / 2;
                const capsuleWidth = LINE_WIDTH + 18;
                const capsuleHeight = Math.sqrt((capsuleButtomX - capsuleTopX)*(capsuleButtomX - capsuleTopX) + (capsuleButtomY - capsuleTopY)*(capsuleButtomY - capsuleTopY)) + 28;
                const capsuleAngle = Math.atan2((capsuleButtomY - capsuleTopY), (capsuleButtomX - capsuleTopX)) * (180 / Math.PI) - 90;
                // 停車点描画
                drawCapsuleOnLine(elmCanvas, capsuleCx - capsuleWidth / 2, capsuleCy - capsuleHeight / 2, capsuleWidth, capsuleHeight, capsuleWidth / 2, capsuleAngle, capsuleCx, capsuleCy);
                // 駅名囲み描画
                drawRect(elmCanvas, baseX - 26, baseY + 20, 52, 80 + stationNameLength, 26, 26, getRankColor(5));
            }
            TRAIN_TYPES.forEach((t, i) => {
                if (stationRanks[station.id] >= t.rank) {
                    // 停車点描画
                    drawDot(elmCanvas, potision.x + getShiftX(i), potision.y + i * LINE_GAP, t.color);
                }
            });
            // 駅番号バッジ描画
            drawBadge(elmCanvas, baseX, baseY + 45, station.num, "KO", getRankColor(5));
            // 駅名描画
            drawStationName(elmCanvas, baseX, baseY + 65, station.name, isRank5, "vertical");
        } else if (potision.layout === 'rising_right') {
            const kitanoP = positions['kitano'];
            let minDotX = 99999, maxDotX = -99999;
            TRAIN_TYPES.forEach((t, i) => {
                if (stationRanks[station.id] >= t.rank) {
                    const r = BEND_RADIUS_BASE + i * LINE_GAP;
                    const ex = kitanoP.x + r * Math.sin(SLANT_ANGLE);
                    const ey = (kitanoP.y + i * LINE_GAP) - r * (1 - Math.cos(SLANT_ANGLE));
                    const dotX = ex + (ey - potision.y) / Math.tan(SLANT_ANGLE);
                    if (dotX < minDotX) {
                        minDotX = dotX;
                    }
                    if (dotX > maxDotX) {
                        maxDotX = dotX;
                    }
                    if (i === 4) {
                        potision._outerX = dotX;
                    }
                }
            });
            const baseX = (potision._outerX || maxDotX) + 45;
            const baseY = potision.y;
            if (isRank5) {
                const capsuleWidth = maxDotX - minDotX + (20 * 2);
                const capsuleHeight = LINE_WIDTH + 14;
                const boxWidth = 90 + stationNameLength;
                // 停車点描画
                drawCapsuleOnLine(elmCanvas, minDotX - 20, potision.y - capsuleHeight / 2, capsuleWidth, capsuleHeight, capsuleHeight / 2);
                // 駅名囲み描画
                drawRect(elmCanvas, baseX - 22, baseY - 26, boxWidth, 52, 26, 26, getRankColor(5));
            }
            TRAIN_TYPES.forEach((t, i) => {
                if (stationRanks[station.id] >= t.rank) {
                    const r = BEND_RADIUS_BASE + i * LINE_GAP;
                    const ex = kitanoP.x + r * Math.sin(SLANT_ANGLE);
                    const ey = (kitanoP.y + i * LINE_GAP) - r * (1 - Math.cos(SLANT_ANGLE));
                    const dotX = ex + (ey - potision.y) / Math.tan(SLANT_ANGLE);
                    // 停車点描画
                    drawDot(elmCanvas, dotX, potision.y, t.color);
                }
            });
            // 駅番号バッジ描画
            drawBadge(elmCanvas, baseX, baseY, station.num, "KO", getRankColor(5));
            // 駅名描画
            drawStationName(elmCanvas, baseX + 20, baseY, station.name, isRank5, "left");
        }
    });

    // 路線図ロゴ・ラベル描画
    drawLogoAndLabels(elmCanvas, positions);
}
// 井の頭線 描画関数
function drawInokashiraLine(canvas, positions) {
    const { inoTop, inoButtom, length, angle } = positions._inoInfo;

    const offsetPx = 10;
    const indexDelta = offsetPx / LINE_GAP;
    const CENTER_INDEX = 2; // 中心線インデックス
    const centerShiftX = getShiftX(CENTER_INDEX);
    const centerVOffset = getShiftY(CENTER_INDEX);
    
    const idxExp = CENTER_INDEX - indexDelta;
    const dxExp = getShiftX(idxExp) - centerShiftX;
    const dyExp = getShiftY(idxExp) - centerVOffset;
    const idxLoc = CENTER_INDEX + indexDelta;
    const dxLoc = getShiftX(idxLoc) - centerShiftX;
    const dyLoc = getShiftY(idxLoc) - centerVOffset;

    // パス生成
    const generatePath = (offsetX, offsetY, isExpress) => {
        const rInoTopCurve = isExpress ? BEND_RADIUS_BASE + Math.abs(offsetY) : BEND_RADIUS_BASE - Math.abs(offsetY);
        const rInoButtomCurve = isExpress ? BEND_RADIUS_BASE - Math.abs(offsetY) : BEND_RADIUS_BASE + Math.abs(offsetY);

        const InoTopX = positions['shibuya'].x + offsetX; 
        const InoTopY = inoTop.y + offsetY;
        
        const xInoTopCurve = inoTop.x + offsetX;
        const yInoTopCurve = inoTop.y + offsetY;
        
        const dxInoTopCurve = xInoTopCurve + rInoTopCurve * Math.sin(angle);
        const dyInoTopCurve = yInoTopCurve + rInoTopCurve * (1 - Math.cos(angle));
        
        const xInoStraight = dxInoTopCurve + length * Math.cos(angle);
        const yInoStraight = dyInoTopCurve + length * Math.sin(angle);
        
        const xInoButtomCurve = xInoStraight + rInoButtomCurve * Math.sin(angle);
        const yInoButtomCurve = yInoStraight + rInoButtomCurve * (1 - Math.cos(angle));
        
        const InoButtomX = positions['kichijoji'].x + offsetX;
        const InoButtomY = inoButtom.y + offsetY;

        return `M ${InoTopX},${InoTopY} L ${xInoTopCurve},${yInoTopCurve} ` +
               `A ${rInoTopCurve} ${rInoTopCurve} 0 0 1 ${dxInoTopCurve},${dyInoTopCurve} ` + 
               `L ${xInoStraight},${yInoStraight} ` +
               `A ${rInoButtomCurve} ${rInoButtomCurve} 0 0 0 ${xInoButtomCurve},${yInoButtomCurve} ` + 
               `L ${InoButtomX},${InoButtomY}`;
    };

    // 各停ライン
    const dataPathLocal = document.createElementNS("http://www.w3.org/2000/svg", "path");
    dataPathLocal.setAttribute("d", generatePath(dxLoc, dyLoc, false));
    dataPathLocal.setAttribute("stroke", getRankColor(1));
    dataPathLocal.setAttribute("stroke-width", LINE_WIDTH);
    dataPathLocal.setAttribute("fill", "none");
    canvas.appendChild(dataPathLocal);

    // 急行ライン
    const dataPathExpress = document.createElementNS("http://www.w3.org/2000/svg", "path");
    dataPathExpress.setAttribute("d", generatePath(dxExp, dyExp, true));
    dataPathExpress.setAttribute("stroke", getRankColor(4));
    dataPathExpress.setAttribute("stroke-width", LINE_WIDTH);
    dataPathExpress.setAttribute("fill", "none");
    canvas.appendChild(dataPathExpress);

    // 駅描画
    const inoStations = STATIONS.filter(s => s.group === 'ino')
    if (inoStations.length > 0) {
        inoStations.forEach(s => {
            const p = positions[s.id];
            const rank = stationRanks[s.id];
            const isExpress = (rank === 4);
            
            let lxExp = 0, lyExp = 0, lxLoc = 0, lyLoc = 0;
            lxExp = p.x + dxExp;
            lyExp = p.y + dyExp;
            lxLoc = p.x + dxLoc;
            lyLoc = p.y + dyLoc;
            
            if (isExpress) {
                const dxCapsule = lxLoc - lxExp;
                const dyCapsule = lyLoc - lyExp;
                const cxCapsule = (lxLoc + lxExp) / 2;
                const cyCapsule = (lyLoc + lyExp) / 2;
                const widthCapsule = LINE_WIDTH + 18;
                const heightCapsule = Math.sqrt(dxCapsule * dxCapsule + dyCapsule * dyCapsule) + 28;
                const angleCapsule = Math.atan2(dyCapsule, dxCapsule) * (180 / Math.PI) - 90;
                // 停車点カプセル
                drawCapsuleOnLine(canvas, cxCapsule - widthCapsule / 2, cyCapsule - heightCapsule / 2, widthCapsule, heightCapsule, widthCapsule / 2, angleCapsule, cxCapsule, cyCapsule);
    
                // 駅名囲み
                drawRect(canvas, p.x + dxLoc - 26, p.y + dyLoc + 20, 52, 80 + (s.name.length * 32), 26, 26, getRankColor(4));
            }
            // 停車点
            drawDot(canvas, lxLoc, lyLoc, getRankColor(1));
            if (isExpress) {
                drawDot(canvas, lxExp, lyExp, getRankColor(4));
            }
            // 駅番号バッジ
            drawBadge(canvas, lxLoc, lyLoc + 45, s.num, "IN", COLOR_KEIO_BLUE);
            // 駅名
            drawStationName(canvas, lxLoc + 15, lyLoc + 70, s.name, isExpress, "verticalIno");
        });
    }
}

// 関数: ユーティリティ
// ランク名取得
function getRankName(rank) {
    return TRAIN_TYPES.find(t => t.rank == rank)?.name || "";
}
// ランク色取得
function getRankColor(rank) {
    return TRAIN_TYPES.find(t => t.rank == rank)?.color || "";
}
// 線路間隔設定
function getShiftY(idx) {
    return idx * LINE_GAP;
}
// 線路斜めずらし設定
function getShiftX(idx) {
    const MAX_TRAIN_INDEX = TRAIN_TYPES.length - 1;
    return (MAX_TRAIN_INDEX - idx) * OFFSET_X_STEP;
}
// 停車点カプセル描画
function drawCapsuleOnLine(svg, x, y, width, height, rx, angle = undefined, cx = undefined, cy = undefined) {
    const elmCapsule = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    elmCapsule.setAttribute("x", x);
    elmCapsule.setAttribute("y", y);
    elmCapsule.setAttribute("width", width);
    elmCapsule.setAttribute("height", height);
    elmCapsule.setAttribute("rx", rx);
    elmCapsule.setAttribute("fill", "white");
    elmCapsule.setAttribute("stroke", getRankColor(2));
    elmCapsule.setAttribute("stroke-width", 3);
    if (angle !== undefined && cx !== undefined && cy !== undefined) {
        elmCapsule.setAttribute("transform", `rotate(${angle}, ${cx}, ${cy})`);
    }
    svg.appendChild(elmCapsule);
}
// 駅名囲み描画
function drawRect(svg, x, y, width, height, rx, ry, stroke) {
    const elmRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    elmRect.setAttribute("x", x);
    elmRect.setAttribute("y", y);
    elmRect.setAttribute("width", width);
    elmRect.setAttribute("height", height);
    elmRect.setAttribute("rx", rx);
    elmRect.setAttribute("ry", ry); 
    elmRect.setAttribute("fill", "white");
    elmRect.setAttribute("stroke", stroke);
    elmRect.setAttribute("stroke-width", "4");
    svg.appendChild(elmRect);
}
// 停車点描画
function drawDot(svg, x, y, color) {
    const elmDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    elmDot.setAttribute("cx", x);
    elmDot.setAttribute("cy", y);
    elmDot.setAttribute("r", 6.5);
    elmDot.setAttribute("fill", "white");
    elmDot.setAttribute("stroke", color);
    elmDot.setAttribute("stroke-width", 3.5);
    svg.appendChild(elmDot);
}
// 駅番号バッジ描画
function drawBadge(svg, x, y, num, prefix, color) { 
    const r = 16; 
    let elmBadge = document.createElementNS("http://www.w3.org/2000/svg", "circle"); 
    elmBadge.setAttribute("cx", x);
    elmBadge.setAttribute("cy", y);
    elmBadge.setAttribute("r", r); 
    elmBadge.setAttribute("fill", "white");
    elmBadge.setAttribute("stroke", color);
    elmBadge.setAttribute("stroke-width", 2); 
    svg.appendChild(elmBadge);
    
    elmBadge = document.createElementNS("http://www.w3.org/2000/svg", "path"); 
    elmBadge.setAttribute("d", `M ${x - r},${y} A ${r},${r} 0 0,1 ${x + r},${y} Z`);
    elmBadge.setAttribute("fill", color); 
    svg.appendChild(elmBadge); 

    elmBadge = document.createElementNS("http://www.w3.org/2000/svg", "text"); 
    elmBadge.setAttribute("x", x);
    elmBadge.setAttribute("y", y - 2); 
    elmBadge.setAttribute("text-anchor", "middle");
    elmBadge.setAttribute("font-size", 11); 
    elmBadge.setAttribute("font-weight", "900");
    elmBadge.setAttribute("fill", "white"); 
    elmBadge.textContent = prefix;
    svg.appendChild(elmBadge);

    elmBadge = document.createElementNS("http://www.w3.org/2000/svg", "text"); 
    elmBadge.setAttribute("x", x);
    elmBadge.setAttribute("y", y + 12); 
    elmBadge.setAttribute("text-anchor", "middle");
    elmBadge.setAttribute("font-size", 14); 
    elmBadge.setAttribute("font-weight", "bold"); 
    elmBadge.textContent = (num < 10 ? "0" + num : num); 
    svg.appendChild(elmBadge); 
}
// 駅名描画
function drawStationName(svg, x, y, name, isBold, align) {
    const elmStationName = document.createElementNS("http://www.w3.org/2000/svg", "text");
    elmStationName.setAttribute("x", x);
    elmStationName.setAttribute("y", y);
    elmStationName.setAttribute("font-family", "'Hiragino Kaku Gothic ProN', sans-serif");
    elmStationName.setAttribute("font-weight", isBold ? "900" : "normal");
    elmStationName.setAttribute("font-size", "32");
    if (align === "vertical") {
        elmStationName.setAttribute("writing-mode", "vertical-rl");
        elmStationName.setAttribute("text-anchor", "start");
    }
    if (align === "verticalIno") {
        elmStationName.setAttribute("writing-mode", "vertical-rl");
        elmStationName.setAttribute("dominant-baseline", "text-before-edge");
    } else {
        elmStationName.setAttribute("dominant-baseline", "central");
    }
    elmStationName.textContent = name;
    svg.appendChild(elmStationName);
}
// 路線図ロゴ・ラベル描画
function drawLogoAndLabels(group, pos) {
    // 路線図ロゴ
    if (pos['hachiman']) {
        const logoGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const basePosition = pos['hachiman'];
        const titleX = basePosition.x; 
        const titleY = basePosition.y - 700; 
        
        const logoKeio = document.createElementNS("http://www.w3.org/2000/svg", "text");
        logoKeio.setAttribute("x", titleX);
        logoKeio.setAttribute("y", titleY);
        logoKeio.setAttribute("font-family", "KeioLogo, Arial Black, sans-serif");
        logoKeio.setAttribute("font-size", "100");
        logoKeio.setAttribute("fill", COLOR_KEIO_BLUE);
        logoKeio.setAttribute("font-style", "italic");
        logoKeio.textContent = "KEIO";
        logoGroup.appendChild(logoKeio);

        const logoMap = document.createElementNS("http://www.w3.org/2000/svg", "text");
        logoMap.setAttribute("x", titleX);
        logoMap.setAttribute("y", titleY + 150);
        logoMap.setAttribute("font-family", "'Hiragino Kaku Gothic ProN', sans-serif");
        logoMap.setAttribute("font-size", "150");
        logoMap.setAttribute("font-weight", "bold");
        logoMap.setAttribute("fill", COLOR_KEIO_BLUE);
        logoMap.textContent = "路線案内";
        logoGroup.appendChild(logoMap);

        const logoSub = document.createElementNS("http://www.w3.org/2000/svg", "text");
        logoSub.setAttribute("x", titleX);
        logoSub.setAttribute("y", titleY + 250);
        logoSub.setAttribute("font-family", "Arial, sans-serif");
        logoSub.setAttribute("font-size", "70");
        logoSub.setAttribute("font-weight", "bold");
        logoSub.setAttribute("fill", COLOR_KEIO_BLUE);
        logoSub.textContent = "Keiō Railway Map";
        logoGroup.appendChild(logoSub);

        group.appendChild(logoGroup);
    }
    // 路線ラベル
    // 京王本線
    if (pos['fuchu']) {
        const position = pos['fuchu'];
        drawBadgeLabel(group, position.x - 200, position.y + 450, 300, 250, 150, "京王線", "Keiō Line", COLOR_KEIO_MAGENTA, 0, 54, 30);
    }
    // 相模原線
    if (pos['tamagawa']) {
        const position = pos['tamagawa'];
        drawBadgeLabel(group, position.x + 100, position.y - 80, 200, 90, 50, "相模原線", "Sagamihara Line", COLOR_KEIO_MAGENTA);
    }
    // 高尾線
    if (pos['mejiro']) {
        const position = pos['mejiro'];
        drawBadgeLabel(group, position.x + 360, position.y + 60, 200, 90, 50, "高尾線", "Takao Line", COLOR_KEIO_MAGENTA, 290);
    }
    // 井の頭線
    if (pos['meidaimae']) {
        const position = pos['meidaimae'];
        drawBadgeLabel(group, position.x + 100, position.y - 230, 280, 220, 150, "井の頭線", "Inokashira Line", COLOR_KEIO_BLUE, 0, 50, 28);
    }
    // 凡例
    if (pos['seiseki']) {
        const legendX = pos['seiseki'].x + 300;
        const legendY = pos['seiseki'].y + 400; 
        drawLegend(group, legendX, legendY);
    }
}
// 路線ラベル描画
function drawBadgeLabel(group, cx, cy, width, height, radius, textJp, textEn, bgColor, angle = 0, sizeJp = 32, sizeEn = 14) {
    // バッジグループ
    const badgeGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    if (angle !== 0) {
        badgeGroup.setAttribute("transform", `rotate(${angle}, ${cx}, ${cy})`);
    }
    // バッジ本体
    const badgeBody = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    badgeBody.setAttribute("x", cx - width / 2);
    badgeBody.setAttribute("y", cy - height / 2);
    badgeBody.setAttribute("width", width);
    badgeBody.setAttribute("height", height);
    badgeBody.setAttribute("rx", radius);
    badgeBody.setAttribute("ry", radius);
    badgeBody.setAttribute("fill", bgColor);
    badgeGroup.appendChild(badgeBody);
    // バッジ文字 - 日本語
    const badgeTxtJp = document.createElementNS("http://www.w3.org/2000/svg", "text");
    badgeTxtJp.setAttribute("x", cx);
    badgeTxtJp.setAttribute("y", cy + 5);
    badgeTxtJp.setAttribute("text-anchor", "middle");
    badgeTxtJp.setAttribute("font-family", "'Hiragino Kaku Gothic ProN', sans-serif");
    badgeTxtJp.setAttribute("font-weight", "900");
    badgeTxtJp.setAttribute("font-size", sizeJp);
    badgeTxtJp.setAttribute("fill", "white");
    badgeTxtJp.textContent = textJp;
    badgeGroup.appendChild(badgeTxtJp);
    // バッジ文字 - 英語
    const badgeTxtEn = document.createElementNS("http://www.w3.org/2000/svg", "text");
    badgeTxtEn.setAttribute("x", cx);
    badgeTxtEn.setAttribute("y", cy + 32);
    badgeTxtEn.setAttribute("text-anchor", "middle");
    badgeTxtEn.setAttribute("font-family", "Arial, sans-serif");
    badgeTxtEn.setAttribute("font-size", sizeEn);
    badgeTxtEn.setAttribute("font-weight", "bold");
    badgeTxtEn.setAttribute("fill", "white");
    badgeTxtEn.setAttribute("font-style", "italic");
    badgeTxtEn.textContent = textEn;
    badgeGroup.appendChild(badgeTxtEn);
    
    group.appendChild(badgeGroup);
}
// 凡例描画
function drawLegend(group, cx, cy) {
    const width = 650;
    const height = 450;
    const x = cx - width / 2;
    const y = cy;
    // 凡例グループ
    const legendGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    legendGroup.setAttribute("transform", `translate(${x}, ${y})`);
    // 凡例背景
    const background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    background.setAttribute("width", width);
    background.setAttribute("height", height);
    background.setAttribute("rx", 30);
    background.setAttribute("fill", "#dcf1f9");
    legendGroup.appendChild(background);
    // 凡例タイトル
    const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
    title.setAttribute("x", 40);
    title.setAttribute("y", 60);
    title.setAttribute("font-family", "'Hiragino Kaku Gothic ProN', sans-serif");
    title.setAttribute("font-weight", "bold");
    title.setAttribute("font-size", "42");
    title.setAttribute("fill", "#1a538d");
    title.textContent = "凡例";
    legendGroup.appendChild(title);

    const col1X = 50;
    const col2X = 350;
    const startY = 110;
    const stepY = 70;
    // 列車種別アイテム
    drawLegendTrainItem(legendGroup, col1X, startY + stepY * 0, "各駅停車", "Local", getRankColor(1));
    drawLegendTrainItem(legendGroup, col1X, startY + stepY * 1, "快速", "Rapid", getRankColor(2));
    drawLegendTrainItem(legendGroup, col1X, startY + stepY * 2, "区間急行", "Semi-Express", getRankColor(3));
    drawLegendTrainItem(legendGroup, col2X, startY + stepY * 0, "急行", "Express", getRankColor(4));
    drawLegendTrainItem(legendGroup, col2X, startY + stepY * 1, "特急", "Special Express", getRankColor(5));
    // 駅番号バッジアイテム
    drawLegendStationBadge(legendGroup, col1X, startY + stepY * 3 + 10, "KO", "京王線駅番号", "Keiō Line Station Number", getRankColor(5));
    drawLegendStationBadge(legendGroup, col1X, startY + stepY * 4 + 10, "IN", "井の頭線駅番号", "Inokashira Line Station Number", COLOR_KEIO_BLUE);
    // 連絡線アイテム
    drawLegendTransferItem(legendGroup, col2X, startY + stepY * 2, "連絡線", "Transfer");

    group.appendChild(legendGroup);
}
// 凡例描画 - 列車種別アイテム
function drawLegendTrainItem(svg, x, y, nameJp, nameEn, color) {
    const width = 80;
    const height = 24;
    // 列車種別バー
    const barLegendTrainItem = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    barLegendTrainItem.setAttribute("x", x);
    barLegendTrainItem.setAttribute("y", y - height/2);
    barLegendTrainItem.setAttribute("width", width);
    barLegendTrainItem.setAttribute("height", height);
    barLegendTrainItem.setAttribute("rx", height/2);
    barLegendTrainItem.setAttribute("fill", color);
    svg.appendChild(barLegendTrainItem);
    // 列車種別ドット
    const circleLegendTrainItem = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circleLegendTrainItem.setAttribute("cx", x + width - height/2);
    circleLegendTrainItem.setAttribute("cy", y);
    circleLegendTrainItem.setAttribute("r", 6);
    circleLegendTrainItem.setAttribute("fill", "white");
    svg.appendChild(circleLegendTrainItem);
    
    const textX = x + width + 20;
    // 列車種別ラベル - 日本語
    const textJpLegendTrainItem = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textJpLegendTrainItem.setAttribute("x", textX);
    textJpLegendTrainItem.setAttribute("y", y - 5);
    textJpLegendTrainItem.setAttribute("font-family", "'Hiragino Kaku Gothic ProN', sans-serif");
    textJpLegendTrainItem.setAttribute("font-weight", "900");
    textJpLegendTrainItem.setAttribute("font-size", "20");
    textJpLegendTrainItem.setAttribute("fill", "#222");
    textJpLegendTrainItem.textContent = nameJp;
    svg.appendChild(textJpLegendTrainItem);
    // 列車種別ラベル - 英語
    const textEnLegendTrainItem = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textEnLegendTrainItem.setAttribute("x", textX);
    textEnLegendTrainItem.setAttribute("y", y + 14);
    textEnLegendTrainItem.setAttribute("font-family", "Arial, sans-serif");
    textEnLegendTrainItem.setAttribute("font-weight", "bold");
    textEnLegendTrainItem.setAttribute("font-style", "italic");
    textEnLegendTrainItem.setAttribute("font-size", "16");
    textEnLegendTrainItem.setAttribute("fill", "#222");
    textEnLegendTrainItem.textContent = nameEn;

    svg.appendChild(textEnLegendTrainItem);
}
// 凡例描画 - 連絡線アイテム
function drawLegendTransferItem(svg, x, y, nameJp, nameEn) {
    const width = 80;
    // 連絡線ライン
    const lineLegendTransferItem = document.createElementNS("http://www.w3.org/2000/svg", "line");
    lineLegendTransferItem.setAttribute("x1", x);
    lineLegendTransferItem.setAttribute("y1", y);
    lineLegendTransferItem.setAttribute("x2", x + width);
    lineLegendTransferItem.setAttribute("y2", y);
    lineLegendTransferItem.setAttribute("stroke", "#666");
    lineLegendTransferItem.setAttribute("stroke-width", "4");
    lineLegendTransferItem.setAttribute("stroke-linecap", "round");
    svg.appendChild(lineLegendTransferItem);
    
    const textX = x + width + 20;
    // 連絡線ラベル - 日本語
    const textJpLegendTransferItem = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textJpLegendTransferItem.setAttribute("x", textX);
    textJpLegendTransferItem.setAttribute("y", y - 5);
    textJpLegendTransferItem.setAttribute("font-family", "'Hiragino Kaku Gothic ProN', sans-serif");
    textJpLegendTransferItem.setAttribute("font-weight", "900");
    textJpLegendTransferItem.setAttribute("font-size", "20");
    textJpLegendTransferItem.setAttribute("fill", "#222");
    textJpLegendTransferItem.textContent = nameJp;
    svg.appendChild(textJpLegendTransferItem);
    // 連絡線ラベル - 英語
    const textEnLegendTransferItem = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textEnLegendTransferItem.setAttribute("x", textX);
    textEnLegendTransferItem.setAttribute("y", y + 14);
    textEnLegendTransferItem.setAttribute("font-family", "Arial, sans-serif");
    textEnLegendTransferItem.setAttribute("font-weight", "bold");
    textEnLegendTransferItem.setAttribute("font-style", "italic");
    textEnLegendTransferItem.setAttribute("font-size", "16");
    textEnLegendTransferItem.setAttribute("fill", "#222");
    textEnLegendTransferItem.textContent = nameEn;

    svg.appendChild(textEnLegendTransferItem);
}
// 凡例描画 - 駅番号バッジアイテム
function drawLegendStationBadge(svg, x, y, prefix, nameJp, nameEn, color) {
    const r = 20;
    const cx = x + r;
    const cy = y;
    // 駅番号バッジ円
    const circleLegendStationBadge = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circleLegendStationBadge.setAttribute("cx", cx);
    circleLegendStationBadge.setAttribute("cy", cy);
    circleLegendStationBadge.setAttribute("r", r);
    circleLegendStationBadge.setAttribute("fill", "white");
    circleLegendStationBadge.setAttribute("stroke", color);
    circleLegendStationBadge.setAttribute("stroke-width", "3");
    svg.appendChild(circleLegendStationBadge);
    // 駅番号バッジ上部
    const pathLegendStationBadge = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathLegendStationBadge.setAttribute("d", `M ${cx-r+1.5},${cy} A ${r-1.5},${r-1.5} 0 0,1 ${cx+r-1.5},${cy} Z`);
    pathLegendStationBadge.setAttribute("fill", color);
    svg.appendChild(pathLegendStationBadge);
    // 駅番号バッジテキスト
    const prefixLegendStationBadge = document.createElementNS("http://www.w3.org/2000/svg", "text");
    prefixLegendStationBadge.setAttribute("x", cx);
    prefixLegendStationBadge.setAttribute("y", cy - 2);
    prefixLegendStationBadge.setAttribute("text-anchor", "middle");
    prefixLegendStationBadge.setAttribute("font-size", "14");
    prefixLegendStationBadge.setAttribute("font-weight", "bold");
    prefixLegendStationBadge.setAttribute("fill", "white");
    prefixLegendStationBadge.textContent = prefix;
    svg.appendChild(prefixLegendStationBadge);
    // 駅番号バッジ番号
    const numberLegendStationBadge = document.createElementNS("http://www.w3.org/2000/svg", "text");
    numberLegendStationBadge.setAttribute("x", cx);
    numberLegendStationBadge.setAttribute("y", cy + 14);
    numberLegendStationBadge.setAttribute("text-anchor", "middle");
    numberLegendStationBadge.setAttribute("font-size", "16");
    numberLegendStationBadge.setAttribute("font-weight", "bold");
    numberLegendStationBadge.setAttribute("fill", "black");
    numberLegendStationBadge.textContent = "00";
    svg.appendChild(numberLegendStationBadge);

    const textX = x + (r * 2) + 40;
    // 駅番号バッジラベル - 日本語
    const textJpLegendStationBadge = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textJpLegendStationBadge.setAttribute("x", textX);
    textJpLegendStationBadge.setAttribute("y", y - 5);
    textJpLegendStationBadge.setAttribute("font-family", "'Hiragino Kaku Gothic ProN', sans-serif");
    textJpLegendStationBadge.setAttribute("font-weight", "900");
    textJpLegendStationBadge.setAttribute("font-size", "20");
    textJpLegendStationBadge.setAttribute("fill", "#222");
    textJpLegendStationBadge.textContent = nameJp;
    svg.appendChild(textJpLegendStationBadge);
    // 駅番号バッジラベル - 英語
    const textEnLegendStationBadge = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textEnLegendStationBadge.setAttribute("x", textX);
    textEnLegendStationBadge.setAttribute("y", y + 14);
    textEnLegendStationBadge.setAttribute("font-family", "Arial, sans-serif");
    textEnLegendStationBadge.setAttribute("font-weight", "bold");
    textEnLegendStationBadge.setAttribute("font-style", "italic");
    textEnLegendStationBadge.setAttribute("font-size", "16");
    textEnLegendStationBadge.setAttribute("fill", "#222");
    textEnLegendStationBadge.textContent = nameEn;
    svg.appendChild(textEnLegendStationBadge);
}