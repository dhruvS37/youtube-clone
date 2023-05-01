const videoCardContainer = document.querySelector('.video-container');
let api_key = "AIzaSyBhSXWXIHP0Y1SJ5SWoIOdLZap297k7clg";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 60,
    regionCode: 'IN'

}))
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.items.forEach(item => {
            getChannelIcon(item);
        });
    })
    .catch(e => console.log(e));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
        .then(res => res.json())
        .then(data => {
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            // console.log(video_data.channelThumbnail);
            makeVideoCard(video_data);
        })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
        <div class="video" onclick = "location.href = 'http://youtube.com/watch?v=${data.id}'">
            <img src="${data.snippet.thumbnails.high.url}" class = "thumbnail" alt="">
            <div class="content">
                <img src="${data.channelThumbnail}" alt="" class="channel-icon">
                <div class="info">
                    <h4 class="title">${data
            .snippet.title}</h4>
                    <p class="channel-name">${data.snippet.channelTitle}</p>
                </div>
            </div>
        </div>
    `;
}

const searchInt = document.querySelector('.search-bar');
const searchbtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchbtn.addEventListener('click', () => {
    if (searchInt.value.length) {
        location.href = searchLink + searchInt.value;
    }
})

let menuIcon = document.querySelector('#menu-icon');
let sidebar = document.querySelector('.side-bar');
menuIcon.onclick = () => {
    sidebar.classList.toggle('show');
}

let sidelinks = document.querySelectorAll('.links');
sidelinks.forEach(link => {
    link.onclick = () => {
        sidelinks.forEach(link => {
            link.classList.remove('active');
        })
        link.classList.add('active');
    }
})


