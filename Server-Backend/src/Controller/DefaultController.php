<?php

namespace App\Controller;

use App\Entity\Mesures;
use App\Entity\Reseaux;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

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
        $id = 1;
        //$number = random_int(0, 10);
        $reseau = $this->getDoctrine()
        ->getRepository(Reseaux::class)
        ->find($id);

        if (!$reseau) {
            throw 'No reseau found for id '.$id;
        }
        return new Response(
            '<html><body>test: ' . $id . '</body></html>'
        );
    }
}