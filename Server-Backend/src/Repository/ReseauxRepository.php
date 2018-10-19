<?php

namespace App\Repository;

use App\Entity\Reseaux;
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityManagerInterface;

/**
 * Class ReseauxRepository
 * @package App\Repository
 */
class ReseauxRepository extends DataRepository
{
    public function __construct(EntityManagerInterface $em)
    {
        parent::__construct($em, $em->getClassMetadata(Reseaux::class));
    }

    /**
     * @param $typeFilters
     * @return \Doctrine\ORM\QueryBuilder
     * @throws \Doctrine\ORM\Query\QueryException
     */
    public function addTypeFilter($typeFilters)
    {
        return $this->getQueryBuilder()->addCriteria(
            Criteria::create()->andWhere(
                Criteria::expr()->in('T.type', $typeFilters)
            )
        );
    }
}