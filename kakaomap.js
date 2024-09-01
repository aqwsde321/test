
function getPlacesFromKeywordSearch(keyword = '애니 굿즈') {
    const places = new kakao.maps.services.Places();

    const callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {

            for (const obj of result) {
                makeMap(obj)
            }
        }
    };

    places.keywordSearch(keyword, callback);

}

function makeMap(obj) {
    console.log(obj)

    const x = Number(obj.x);
    const y = Number(obj.y);
    const place_url = obj.place_url;

    const map_container = document.createElement('div');
    map_container.className = 'map-container';
    const map_class = document.createElement('div');
    map_class.className = 'map-class';
    const map_desc = document.createElement('div');
    map_desc.className = 'nes-container is-rounded map-desc';
    map_desc.innerHTML = `
    <p>
    <h4>${obj.place_name}</h4><br>
    ${obj.address_name}<br>
    ${obj.phone}
    </p>
    `;

    map_container.appendChild(map_class);
    map_container.appendChild(map_desc);

    document.getElementById('map-content').appendChild(map_container);

    const mapContainer = map_class, // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(y, x), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 마커가 표시될 위치입니다 
    const markerPosition = new kakao.maps.LatLng(y, x);

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
        position: markerPosition
    });

    kakao.maps.event.addListener(marker, 'click', function () {
        window.open(place_url, '_blank');
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

}

getPlacesFromKeywordSearch();