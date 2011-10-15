<?php

namespace Icons\DefaultBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

class PageController extends Controller
{
    public function indexAction()
    {
        return $this->render('IconsDefaultBundle:Page:index.html.twig');
    }
}
