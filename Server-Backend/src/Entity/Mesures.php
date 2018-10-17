<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Mesures
 *
 * @ORM\Table(name="mesures", indexes={@ORM\Index(name="IdReseau", columns={"IdReseau"})})
 * @ORM\Entity
 */
class Mesures
{
    /**
     * @var int
     *
     * @ORM\Column(name="IdMesure", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idmesure;

    /**
     * @var float|null
     *
     * @ORM\Column(name="Latitude", type="float", precision=10, scale=0, nullable=true)
     */
    private $latitude;

    /**
     * @var float|null
     *
     * @ORM\Column(name="Longitude", type="float", precision=10, scale=0, nullable=true)
     */
    private $longitude;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(name="DateMesure", type="date", nullable=true)
     */
    private $datemesure;

    /**
     * @var float|null
     *
     * @ORM\Column(name="BandePassante", type="float", precision=10, scale=0, nullable=true)
     */
    private $bandepassante;

    /**
     * @var int|null
     *
     * @ORM\Column(name="ForceSignal", type="integer", nullable=true)
     */
    private $forcesignal;

    /**
     * @var Reseaux
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
    public function setIdmesure(int $idmesure): void
    {
        $this->idmesure = $idmesure;
    }

    /**
     * @return float|null
     */
    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    /**
     * @param float|null $latitude
     */
    public function setLatitude(?float $latitude): void
    {
        $this->latitude = $latitude;
    }

    /**
     * @return float|null
     */
    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    /**
     * @param float|null $longitude
     */
    public function setLongitude(?float $longitude): void
    {
        $this->longitude = $longitude;
    }

    /**
     * @return \DateTime|null
     */
    public function getDatemesure(): ?\DateTime
    {
        return $this->datemesure;
    }

    /**
     * @param \DateTime|null $datemesure
     */
    public function setDatemesure(?\DateTime $datemesure): void
    {
        $this->datemesure = $datemesure;
    }

    /**
     * @return float|null
     */
    public function getBandepassante(): ?float
    {
        return $this->bandepassante;
    }

    /**
     * @param float|null $bandepassante
     */
    public function setBandepassante(?float $bandepassante): void
    {
        $this->bandepassante = $bandepassante;
    }

    /**
     * @return int|null
     */
    public function getForcesignal(): ?int
    {
        return $this->forcesignal;
    }

    /**
     * @param int|null $forcesignal
     */
    public function setForcesignal(?int $forcesignal): void
    {
        $this->forcesignal = $forcesignal;
    }

    /**
     * @return Reseaux
     */
    public function getIdreseau(): Reseaux
    {
        return $this->idreseau;
    }

    /**
     * @param Reseaux $idreseau
     */
    public function setIdreseau(Reseaux $idreseau): void
    {
        $this->idreseau = $idreseau;
    }
}
