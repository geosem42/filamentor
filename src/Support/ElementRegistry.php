<?php

namespace Geosem42\Filamentor\Support;

class ElementRegistry
{
    protected array $elements = [];

    public function register(string $elementClass): void
    {
        if (!isset($this->elements[$elementClass])) {
            $this->elements[$elementClass] = new $elementClass();
        }
    }

    public function getElements(): array
    {
        return $this->elements;
    }

    public function getElement(string $elementClass)
    {
        return $this->elements[$elementClass] ?? null;
    }
}
