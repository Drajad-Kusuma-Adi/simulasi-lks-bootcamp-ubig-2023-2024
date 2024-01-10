<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Output</title>
</head>

<body>
    <?php
    $number = $_POST['number'];
    function factorial($number, $rresult)
    {
        // factorial(number, rresult)
        // take param
        // if number 0, echo rresult
        // if number not 0, continue
        // result = number * number -1
        // factorial(number - 1, result)

        if ($number == 0) {
            echo $rresult;
        } else {
            $factor = $number - 1;
            $result = $rresult * $factor;
            echo $factor . '<br>';
            echo $result . '<br>';
            factorial($factor, $result);
        }
        //gabisa bjir
    }
    factorial($number, 0);
    ?>
    <a href="index.php">back</a>
</body>

</html>