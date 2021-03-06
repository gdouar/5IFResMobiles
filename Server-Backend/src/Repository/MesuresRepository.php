<?php

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

    public function sort()
    {
        return $this->getQueryBuilder()->addOrderBy('T.datemesure', 'ASC');
    }

    /**
     * @param $nb_jours
     * @return \Doctrine\ORM\QueryBuilder
     * @throws \Doctrine\ORM\Query\QueryException
     * @throws \Exception
     */
    public function addTimeoutFilter($nb_jours)
    {
        return $this->getQueryBuilder()->addCriteria(
            Criteria::create()->andWhere(
                Criteria::expr()->gte(
                    'T.datemesure',
                    date('Y-m-d', strtotime("-$nb_jours days"))
                )
            )
        );
    }
}