<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    
    // You can add code here to send the email or process the form data as needed
    
    // For demonstration, we'll just display the received data
    echo "<h2>Thank you for your message, $name!</h2>";
    echo "<p>Email: $email</p>";
    echo "<p>Message: $message</p>";
}
?>
