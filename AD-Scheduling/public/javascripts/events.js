var eventListData = [];

$(document).ready(function(){
    populateEventsTable();
});

//populate the events table for the current user
function populateEventsTable(){
    var tableContent = '';

    $.getJSON('/events/eventlist', function( data ){
        eventListData = data;
        $.each(data, function(){
            //define conference as true/false rather than 1/0
            (this.conference === 1) ? this.conference = "Yes" : this.conference = "No";
            var date = new Date(this.date);
            var monthNames = [ "January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December" ];
            var datestring = monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();

            tableContent += '<tr>';
            tableContent += '<td>' + this.sport.toUpperCase() + '</td>';
            tableContent += '<td>' + datestring + '</td>';
            tableContent += '<td>' + this.teams + '</td>';
            tableContent += '<td>' + this.location + '</td>';
            tableContent += '<td>' + this.referees + '</td>';
            tableContent += '<td>' + this.conference + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
        $('#eventList table tbody').html(tableContent);
    })

}