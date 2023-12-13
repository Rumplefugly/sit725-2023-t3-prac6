const addCards = (items) => {
    //console.log("scripts.js addCards function called");
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">' +
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.image + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="#">' + item.link + '</a></p></div>' +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span>' +
            '<p class="card-text">' + item.description + '</p>' +
            '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

/*const getProjects = () => {
	$.get('/api/projects',(response) => {
		if(response.statusCode==200){
			addCards(response.data);
		}
	})
}*/

const submitForm = () => {
    //console.log('scripts.js submitForm function called');
    let formData = {};
    formData.title = $('#title').val();
    formData.image = 'images/' + $('#image').val();
    formData.link = $('#link').val();
    formData.description = $('#description').val();

    //console.log("scripts.js Form Data Submitted: ", formData);
    postCat(formData);
}

function postCat(cat){
    $.ajax({
        url:'/api/cat',
        type:'POST',
        data:cat,
        success: (result)=>{
            if (result.statusCode === 201) {
                alert('cat post successful');
            }
        }
    });
}

function getAllCats(){
    $.get('/api/cats', (response)=>{
        //console.log('script.js getAllCats called');
        // response's data is in array format, so we can use it
        if (response.statusCode === 200) {
            addCards(response.data);
        }
    });
}

$(document).ready(function () {
    //console.log('Document is ready');
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        submitForm();
    });
    $('.modal').modal();
    getAllCats();
});