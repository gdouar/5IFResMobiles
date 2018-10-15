<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class DefaultController
 *
 * Classe de test par défaut
 * @package App\Controller
 */
class DefaultController extends Controller
{
    function __construct()
    {
    }

    /**
     * @return Response
     * @throws \Exception
     */
    public function index()
    {
        $number = random_int(0, 10);
        
        return new Response(
            '<html><body>test: ' . $number . '</body></html>'
        );
    }
}

?>