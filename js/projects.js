const projDetailsButtons = document.querySelectorAll('.project-details');
const page = document.querySelector('#project-a');
const cancel = document.querySelector('#cancel');

const projText = document.querySelectorAll('.item-text');
const projWrap = document.querySelector('#project-wrap');
const projHeader = document.querySelector('#proj-header');
const projDesc = document.querySelector('#proj-desc');
const repoUrl = document.querySelector('#repo-url');
const liveUrl = document.querySelector('#live-url');
var techUsed = document.querySelector('#tech-used');
var features = document.querySelector('#proj-features');

// window.addEventListener('scroll' , e =>
// {
//     const scrollTop = window.scrollY;
//     console.log(scrollTop);
//     page.style.top = `${scrollTop}px`;
// });



const getData = (data) =>
{
    const request = new XMLHttpRequest();

    request.open('GET' , 'projects.json' , true);

    request.onload  = () => 
    {
        data(JSON.parse(request.responseText))
    };

    request.send();
}

function renderHTML(data)
{

    techUsed.innerHTML = '';
    features.innerHTML = '';
    projHeader.innerHTML ='';
    projDesc.innerHTML = ''; 
    projHeader.innerText = data.name;   
    projDesc.innerText  = data.details;   
    liveUrl.innerText = data.liveurl;
    repoUrl.innerText = data.gitlink;
    liveUrl.href = data.liveurl;
    repoUrl.href = data.gitlink;

    
    
    data.technologies.forEach(tech =>
        {
            techUsed.innerHTML += `<li><i class="fas fa-arrow-right"></i> ${tech}</li>`;
        });
    data.features.forEach(feature =>
        {
            features.innerHTML += `<li><i class="fas fa-arrow-right"></i> ${feature}</li>`;
        });
        showPopUp();

}


page.addEventListener('click' , e =>
{
     const id = e.target.getAttribute('id');
     if(id !== null && id === 'project-a')
     {
         hide();
     }
});

projDetailsButtons.forEach( btn =>
    {
        btn.addEventListener('click' , e =>
        {
            page.style.top = `${window.scrollY}px`;
            pageOverFlowControl(true);
            hideProjhoverText(true); 
            let btnId = e.target.getAttribute('id');
            getData( (data) =>
            {
                for(let i in data)
                {
                    if(data[i].id == btnId)
                    {
                        renderHTML(data[i]);
                
                    }
                }
            });
        });
    })


cancel.addEventListener('click' , hide);
function hide()
{
    page.style.display = "none";
    pageOverFlowControl(false);
    hideProjhoverText(false);
}

function showPopUp()
{
    page.style.display = 'block';
}

function pageOverFlowControl(isOverFlowHidden)
{
     if(isOverFlowHidden)
     {
        page.parentElement.style.overflow = 'hidden';
        projWrap.classList.add('slideAnim');
     }
     else
     {
        page.parentElement.style.overflow = 'auto';
        projWrap.classList.remove('slideAnim');
     }
}

function hideProjhoverText(isHide) {
    if(isHide)
    {
        projText.forEach( projtxt =>
            {
                projtxt.style.display = 'none';
            })
    }
    else 
    {
        projText.forEach( projtxt =>
            {
                projtxt.style.display = 'block';
            })
    }
    
}