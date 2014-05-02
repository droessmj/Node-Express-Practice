var eventListData = [];

$(document).ready(function(){
    populateRefsTable();
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
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
        $('#refList table tbody').html(tableContent);
    })

}