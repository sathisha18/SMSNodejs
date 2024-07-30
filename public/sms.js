$(document).ready(function() {
    $('#sms-form').on('submit', function(e) {
        e.preventDefault();
        $.post('/send-sms', {
            to: $('#to').val(),
            message: $('#message').val()
        }).done(function(data) {
            $('#response').text('SMS sent successfully!');
        }).fail(function() {
            $('#response').text('Failed to send SMS.');
        });
    });
});
