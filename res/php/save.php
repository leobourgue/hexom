<?php
  if(!empty($_POST))
  {
    include 'database.php';
    $username=$_POST['username'];
    $pos=$_POST['pos'];
    $colors=$_POST['colors'];
    $links=$_POST['links'];
    $backgroundColor=$_POST['backgroundColor'];
    $shadowColor=$_POST['shadowColor'];
    $shadowSize=$_POST['shadowSize'];
    $images=$_POST['images'];
    $imgSize=$_POST['imgSize'];
    $hexaSize=$_POST['hexaSize'];

    $result = $conn->query("INSERT INTO hexaproperties(username, pos, colors, links, backgroundColor, shadowColor, shadowSize, images, imgSize, hexaSize) VALUES ('$username','$pos', '$colors', '$links', '$backgroundColor', '$shadowColor', '$shadowSize', '$images', '$imgSize', $hexaSize)
     ON DUPLICATE KEY UPDATE username='$username', pos='$pos', colors='$colors', links='$links', backgroundColor='$backgroundColor', shadowColor='$shadowColor', shadowSize='$shadowSize', images='$images', imgSize='$imgSize', hexaSize='$hexaSize'");

    $conn->close();
  }
?>
