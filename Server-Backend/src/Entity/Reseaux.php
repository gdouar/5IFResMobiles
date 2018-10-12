<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Reseaux
 *
 * @ORM\Table(name="Reseaux")
 * @ORM\Entity
 */
class Reseaux
{
    /**
     * @var integer
     *
     * @ORM\Column(name="IdReseau", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idreseau;

    /**
     * @var string
     *
     * @ORM\Column(name="SSID", type="string", length=32, nullable=true)
     */
    private $ssid;

    /**
     * @var string
     *
     * @ORM\Column(name="Type", type="string", length=50, nullable=true)
     */
    private $type;

    /**
     * @return int
     */
    public function getIdreseau(): int
    {
        return $this->idreseau;
    }

    /**
     * @param int $idreseau
     */
    public function setIdreseau(int $idreseau)
    {
        $this->idreseau = $idreseau;
    }

    /**
     * @return string
     */
    public function getSsid(): string
    {
        return $this->ssid;
    }

    /**
     * @param string $ssid
     */
    public function setSsid(string $ssid)
    {
        $this->ssid = $ssid;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @param string $type
     */
    public function setType(string $type)
    {
        $this->type = $type;
    }
}

