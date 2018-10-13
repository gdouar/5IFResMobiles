<?php
// src/Controller/DefaultController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

//die ("test");
class DefaultController extends Controller
{
    function __construct() {
    }

    public function index()
    {
        $number = random_int(0, 10);

        return new Response(
            '<html><body>test: '.$number.'</body></html>'
        );
    }
}

?>