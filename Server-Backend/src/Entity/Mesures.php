<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Mesures
 *
 * @ORM\Table(name="Mesures", indexes={@ORM\Index(name="IdReseau", columns={"IdReseau"})})
 * @ORM\Entity
 */
class Mesures
{
    /**
     * @var integer
     *
     * @ORM\Column(name="IdMesure", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idmesure;

    /**
     * @var float
     *
     * @ORM\Column(name="Latitude", type="float", precision=10, scale=0, nullable=true)
     */
    private $latitude;

    /**
     * @var float
     *
     * @ORM\Column(name="Longitude", type="float", precision=10, scale=0, nullable=true)
     */
    private $longitude;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="DateMesure", type="date", nullable=true)
     */
    private $datemesure;

    /**
     * @var float
     *
     * @ORM\Column(name="BandePasssante", type="float", precision=10, scale=0, nullable=true)
     */
    private $bandepasssante;

    /**
     * @var integer
     *
     * @ORM\Column(name="ForceSignal", type="integer", nullable=true)
     */
    private $forcesignal;

    /**
     * @var \Reseaux
     *
     * @ORM\ManyToOne(targetEntity="Reseaux")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="IdReseau", referencedColumnName="IdReseau")
     * })
     */
    private $idreseau;

    /**
     * @return int
     */
    public function getIdmesure(): int
    {
        return $this->idmesure;
    }

    /**
     * @param int $idmesure
     */
    public function setIdmesure(int $idmesure)
    {
        $this->idmesure = $idmesure;
    }

    /**
     * @return float
     */
    public function getLatitude(): float
    {
        return $this->latitude;
    }

    /**
     * @param float $latitude
     */
    public function setLatitude(float $latitude)
    {
        $this->latitude = $latitude;
    }

    /**
     * @return float
     */
    public function getLongitude(): float
    {
        return $this->longitude;
    }

    /**
     * @param float $longitude
     */
    public function setLongitude(float $longitude)
    {
        $this->longitude = $longitude;
    }

    /**
     * @return \DateTime
     */
    public function getDatemesure(): \DateTime
    {
        return $this->datemesure;
    }

    /**
     * @param \DateTime $datemesure
     */
    public function setDatemesure(\DateTime $datemesure)
    {
        $this->datemesure = $datemesure;
    }

    /**
     * @return float
     */
    public function getBandepasssante(): float
    {
        return $this->bandepasssante;
    }

    /**
     * @param float $bandepasssante
     */
    public function setBandepasssante(float $bandepasssante)
    {
        $this->bandepasssante = $bandepasssante;
    }

    /**
     * @return int
     */
    public function getForcesignal(): int
    {
        return $this->forcesignal;
    }

    /**
     * @param int $forcesignal
     */
    public function setForcesignal(int $forcesignal)
    {
        $this->forcesignal = $forcesignal;
    }

    /**
     * @return \Reseaux
     */
    public function getIdreseau(): \Reseaux
    {
        return $this->idreseau;
    }

    /**
     * @param \Reseaux $idreseau
     */
    public function setIdreseau(\Reseaux $idreseau)
    {
        $this->idreseau = $idreseau;
    }
}

