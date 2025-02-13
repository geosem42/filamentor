<?php

namespace Geosem42\Filamentor\Contracts;

interface ElementInterface
{
    public function render(): string;
    public function getIcon(): string;
    public function getName(): string;
    public function getSettings(): array;
}
