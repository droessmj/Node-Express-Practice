var eventListData = [];

$(document).ready(function(){
    populateUsersTable();
});

//populate the events table for the current user
function populateUsersTable(){
    var tableContent = '';

    $.getJSON('/users/userlist', function( data ){
        eventListData = data;
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.firstname + '</td>';
            tableContent += '<td>' + this.lastname + '</td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td>' + this.phone + '</td>';
            tableContent += '<td>' + this.school + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
        $('#userList table tbody').html(tableContent);
    })

}