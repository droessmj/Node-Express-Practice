var eventListData = [];

$(document).ready(function(){
    populateRefsTable();
    $('#btnAddRef').on('click', addRef);
    $('#refList table tbody').on('click', 'td a.linkdeleteref', deleteRef);
});

//populate the events table for the current user
function populateRefsTable(){
    var tableContent = '';

    $.getJSON('/refs/reflist', function( data ){
        eventListData = data;
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.firstname + '</td>';
            tableContent += '<td>' + this.lastname + '</td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td>' + this.sports + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteref" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
        $('#refList table tbody').html(tableContent);
    })

}

// Add User
function addRef(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newRef = {
            'firstname': $('#addRef fieldset input#inputFirst').val(),
            'lastname': $('#addRef fieldset input#inputLast').val(),
            'email': $('#addRef fieldset input#inputEmail').val(),
            'sports': $('#addRef fieldset input#inputPhone').val(),
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newRef,
            url: '/refs/addref',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addRef fieldset input').val('');

                // Update the table
                populateRefsTable();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};


// Delete User
function deleteRef(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this referee?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/refs/deleteref/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateRefsTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};