const progressBars = document.querySelectorAll('.progress div');

const isInViewPort = element =>
{
   const rect = element.getBoundingClientRect();
   return (
       rect.top >= 0 &&
       rect.left >= 0 &&
       rect.bottom <=
       (window.innerHeight ||
           document.documentElement.clientHeight) &&
           rect.right <= (window.innerWidth ||
               document.documentElement.clientWidth)
   );
};

function fill()
{
    progressBars.forEach(element =>
        {
            if(isInViewPort(element))
            {
               let id = element.getAttribute('id').replace('-' , '-fill-');
               element.classList.add(id);
            }
       })
}

window.addEventListener('scroll' , fill);
progress-fill-java