

async function getData() {
    let username = document.getElementById("username").value

    
    let res = await fetch(`https://api.github.com/users/${username}`)
    let json = await res.json()
    console.log(json)

    
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

    let repo_title_1 = document.getElementById("repo_title_1")
    let repo_title_2 = document.getElementById("repo_title_2")
    let repo_title_3 = document.getElementById("repo_title_3")
    let repo_title_4 = document.getElementById("repo_title_4")
    
    let repo_desc_1 = document.getElementById("repo_desc_1")
    let repo_desc_2 = document.getElementById("repo_desc_2")
    let repo_desc_3 = document.getElementById("repo_desc_3")
    let repo_desc_4 = document.getElementById("repo_desc_4")
    
    let lang1 = document.getElementById("lang1")
    let lang2 = document.getElementById("lang2")
    let lang3 = document.getElementById("lang3")
    let lang4 = document.getElementById("lang4")

    let stars1 = document.getElementById("stars1")
    let stars2 = document.getElementById("stars2")
    let stars3 = document.getElementById("stars3")
    let stars4 = document.getElementById("stars4")

    let fork1 = document.getElementById("fork1")
    let fork2 = document.getElementById("fork2")
    let fork3 = document.getElementById("fork3")
    let fork4 = document.getElementById("fork4")


    repo_title_1.innerHTML = repos_list[0].name
    repo_title_2.innerHTML = repos_list[1].name
    repo_title_3.innerHTML = repos_list[2].name
    repo_title_4.innerHTML = repos_list[3].name


    repo_desc_1.innerHTML = repos_list[0].description
    repo_desc_2.innerHTML = repos_list[1].description
    repo_desc_3.innerHTML = repos_list[2].description
    repo_desc_4.innerHTML = repos_list[3].description

    lang1.innerHTML = repos_list[0].language
    lang2.innerHTML = repos_list[1].language
    lang3.innerHTML = repos_list[2].language
    lang4.innerHTML = repos_list[3].language

    stars1.innerHTML = repos_list[0].stargazers_count
    stars2.innerHTML = repos_list[1].stargazers_count
    stars3.innerHTML = repos_list[2].stargazers_count
    stars4.innerHTML = repos_list[3].stargazers_count

    fork1.innerHTML = repos_list[0].forks_count
    fork2.innerHTML = repos_list[1].forks_count
    fork3.innerHTML = repos_list[2].forks_count
    fork4.innerHTML = repos_list[3].forks_count

    document.getElementById("link1").href = repos_list[0].html_url
    document.getElementById("link2").href = repos_list[1].html_url
    document.getElementById("link3").href = repos_list[2].html_url
    document.getElementById("link4").href = repos_list[3].html_url




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

document.getElementById("get-stats").addEventListener("click", e => {
    getData()
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

  getData()