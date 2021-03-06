<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class SpeedtestController
 *
 * @package App\Controller
 */
class SpeedtestController extends Controller
{
    public function getSpeedtestImage()
    {
        $file     = file_get_contents("../resources/speedtest-img.jpg");
        $response = new Response($file);
        $response->headers->set('Content-Type', 'image/jpeg');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }
}