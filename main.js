

async function getData() {
    let username = document.getElementById("username").value

    
    let res = await fetch(`https://api.github.com/users/${username}`)
    let json = await res.json()
    
    if (res.status === 200 ){
        let nameElement = document.getElementById("name")
        let dpElement = document.getElementById("dp")
        let bioElement = document.getElementById("bio")
        let github_link_element = document.getElementById("github_link")
        let github_username_element = document.getElementById("github_username")
        let website_link_element = document.getElementById("website_link")
        let location_element = document.getElementById("location")
        let followers_count = document.getElementById("followers_count")
        let following_count = document.getElementById("following_count")
        let public_repos_count = document.getElementById("public_repos_count")
        let public_gists_count = document.getElementById("public_gists_count")

        let website_url = json.blog



        let res1 = await fetch(`https://api.github.com/users/${username}/repos`)
        let repos = await res1.json()
        

        let repos_list = []
        repos.forEach(repo => {
            if (repo.fork == false) {
                repos_list.push(repo)
            }
        })
        repos_list.sort(compare)
        let repos_list_short = repos_list.slice(0, 4)

        showless(repos_list_short)

        document.getElementById("show-more").addEventListener("click", a => {
            if(a.target.innerText == "More Repos"){
                showmore(repos_list)
                a.target.innerText = "Less Repos"
            }
            else if(a.target.innerText == "Less Repos"){
                showless(repos_list_short)
                a.target.innerText = "More Repos"
            }
        })
        

       


        nameElement.innerHTML = `${json.name} (@${json.login})`
        dpElement.src = json.avatar_url
        bioElement.innerHTML = json.bio
        github_link_element.href = json.html_url
        github_username_element.innerHTML = json.login
        if(website_url.startsWith("http")){
            website_link_element.href = website_url

        }
        else{
            website_link_element.href = `https://${website_url}`
        }

        if (json.location == null){
            location_element.innerText = 'Earth'

        }
        else{
            location_element.innerText = json.location
        }
        followers_count.innerText = json.followers
        following_count.innerText = json.following
        public_repos_count.innerText = repos_list.length
        public_gists_count.innerText = json.public_gists



        

    }
    else if(res.status === 404){
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'No such User Found',
            confirmButtonColor: '#ffc107'
            
          })
    }

    
    
    
}

document.getElementById("get-stats").addEventListener("click", async e => {
    getData().catch(err => {
        console.log(err)
    })
    let data = await getData()
})

function compare(a, b) {
    const likeA = a.stargazers_count
    const likeB = b.stargazers_count
  
    let comparison = 0;
    if (likeA > likeB) {
      comparison = -1;
    } else if (likeA < likeB) {
      comparison = 1;
    }
    return comparison;
  }

function showless(repos_list_short){
    let repoContainer = document.getElementById("repo-cont")
        repoContainer.innerHTML = ''
        for( let i=0; i<repos_list_short.length; i++){

            repoContainer.innerHTML += `
            <a id="link1" href="${repos_list_short[i].html_url}">
                <div class="repo" id="1">
                    <h1 id="repo_title_1"><em class="fa fa-file-code-o"></em>&nbsp; ${repos_list_short[i].name}</h1>
                    <p id="repo_desc_1">${repos_list_short[i].description}</p>
                    <div class="stats">
                        <em class="fa fa-circle"></em> <span id="lang1">${repos_list_short[i].language}</span> &nbsp;&nbsp;
                        <em class="fa fa-star-o"></em> <span id="stars1">${repos_list_short[i].stargazers_count}</span> &nbsp;&nbsp;
                        <em class="fa fa-code-fork"></em> <span id="fork1">${repos_list_short[i].forks_count}</span> 
                    </div>
                </div>
            </a>
            `
        }
}

function showmore(repos_list){
    let repoContainer = document.getElementById("repo-cont")
    repoContainer.innerHTML = ''
    for( let i=0; i<repos_list.length; i++){

        repoContainer.innerHTML += `
        <a id="link1" href="${repos_list[i].html_url}">
            <div class="repo" id="1">
                <h1 id="repo_title_1"><em class="fa fa-file-code-o"></em>&nbsp; ${repos_list[i].name}</h1>
                <p id="repo_desc_1">${repos_list[i].description}</p>
                <div class="stats">
                <em class="fa fa-circle"></em> <span id="lang1">${repos_list[i].language}</span> &nbsp;&nbsp;
                <em class="fa fa-star-o"></em> <span id="stars1">${repos_list[i].stargazers_count}</span> &nbsp;&nbsp;
                    <em class="fa fa-code-fork"></em> <span id="fork1">${repos_list[i].forks_count}</span> 
                </div>
            </div>
        </a>
        `
    }
}



getData()