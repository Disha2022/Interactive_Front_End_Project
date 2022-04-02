var overlay = $('#overlay')
var closeBtn = $('#close-modal')
var searchBtn = $('#search-btn')
var searchForm = $('#search-form')
var cancelBtn = $('#cancel-btn')

searchForm.submit(function(e){
    e.preventDefault();
})

function AppearModal(){
        overlay.removeClass('hidden').addClass('flex')
}
function DissapearModal(){
    overlay.removeClass('flex').addClass('hidden')
}
searchBtn.on('click', AppearModal)
closeBtn.on('click', DissapearModal)
cancelBtn.on('click', DissapearModal)
