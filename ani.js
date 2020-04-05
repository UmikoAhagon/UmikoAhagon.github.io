/*----- Page Layout -----*/

const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

/*----- API Connection -----*/

function search() {
    var query = document.getElementById('search_query').value;

    if (query.length < 3) {
        alert('Error: Requires atleast 3 or more characters');
        return;
    }

    var requestUrl = `https://api.jikan.moe/v3/search/anime?q=${query}&limit=35`;
    
    fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
        var node = document.getElementById('search_results');
        while (node.firstChild) {node.removeChild(node.firstChild);}

        data.results.forEach(item => {
            document.getElementById('search_results')
            .insertAdjacentHTML(
                'beforeend',
                `
                <a href="${item.url}" class="card">
                    <div class="card__image">
                        <img src="${item.image_url}" alt="${item.title}" />
                    </div>
                    <div class="card__name">
                        <span>${item.title}</span> 
                    </div>
                </a>
                `
            );
        });
    });
}

document.getElementById('search').onclick = () => search();
document.getElementById('search_query').onkeydown = (event) => {
    if (event.keyCode === 13) {
        search();
    }
};

/*----- Return To Top -----*/

var btn = document.getElementById("button");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
}

btn.onclick = function() {
    $('html, body').animate({scrollTop : 0}, 300);
};
