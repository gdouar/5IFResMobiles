<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class NetworkController
 *
 * @package App\Controller
 */
class NetworkController extends Controller
{
    public function getIp(Request $request)
    {
        $ip =  $request->getClientIp();
        $response = new Response(json_encode(['ip' => ($ip == "::1") ? "127.0.0.1" :$ip ]));        // if localhost
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        return $response;
    }
}