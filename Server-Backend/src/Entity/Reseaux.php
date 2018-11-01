<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\OneToMany;

/**
 * Reseaux
 *
 * @ORM\Table(name="reseaux")
 * @ORM\Entity(repositoryClass="App\Repository\ReseauxRepository")
 */
class Reseaux
{
    /**
     * @var int
     *
     * @ORM\Column(name="IdReseau", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idreseau;

    /**
     * @var string|null
     *
     * @ORM\Column(name="SSID", type="string", length=32, nullable=true)
     */
    private $ssid;

    /**
     * @var string|null
     *
     * @ORM\Column(name="Type", type="string", length=50, nullable=true)
     */
    private $type;

    /**
     * @OneToMany(targetEntity="Mesures", mappedBy="reseau")
     */
    private $mesures;

    /**
     * @var string|null
     *
     * @ORM\Column(name="IpRouteur", type="string", length=200, nullable=true)
     */
    private $iprouteur;

    public function __construct()
    {
        $this->mesures = new ArrayCollection();
    }

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
    public function setIdreseau(int $idreseau): void
    {
        $this->idreseau = $idreseau;
    }

    /**
     * @return null|string
     */
    public function getSsid(): ?string
    {
        return $this->ssid;
    }

    /**
     * @param null|string $ssid
     */
    public function setSsid(?string $ssid): void
    {
        $this->ssid = $ssid;
    }

    /**
     * @return null|string
     */
    public function getType(): ?string
    {
        return $this->type;
    }

    /**
     * @param null|string $type
     */
    public function setType(?string $type): void
    {
        $this->type = $type;
    }

    /**
     * @return mixed
     */
    public function getMesures()
    {
        return $this->mesures;
    }

    /**
     * @return null|string
     */
    public function getIprouteur(): ?string
    {
        return $this->iprouteur;
    }

    /**
     * @param null|string $iprouteur
     */
    public function setIprouteur(?string $iprouteur): void
    {
        $this->iprouteur = $iprouteur;
    }
}
