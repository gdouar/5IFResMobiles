<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Reseaux
 *
 * @ORM\Table(name="reseaux")
 * @ORM\Entity
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
}
