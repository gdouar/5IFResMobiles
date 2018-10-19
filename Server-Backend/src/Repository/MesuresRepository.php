<?php
/**
 * Created by PhpStorm.
 * User: Webcretaire
 * Date: 19/10/2018
 * Time: 14:27
 */

namespace App\Repository;


use App\Entity\Mesures;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityManagerInterface;

class MesuresRepository extends DataRepository
{
    public function __construct(EntityManagerInterface $em)
    {
        parent::__construct($em, $em->getClassMetadata(Mesures::class));
    }

    /**
     * @param $bandwidth
     * @return \Doctrine\ORM\QueryBuilder
     * @throws \Doctrine\ORM\Query\QueryException
     */
    public function addBandwidthFilter($bandwidth)
    {
        return $this->getQueryBuilder()->addCriteria(
            Criteria::create()->andWhere(
                Criteria::expr()->gte('T.bandepassante', $bandwidth)
            )
        );
    }
}