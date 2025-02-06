# This is my package filamentor

[![Latest Version on Packagist](https://img.shields.io/packagist/v/geosem42/filamentor.svg?style=flat-square)](https://packagist.org/packages/geosem42/filamentor)
[![GitHub Tests Action Status](https://img.shields.io/github/actions/workflow/status/geosem42/filamentor/run-tests.yml?branch=main&label=tests&style=flat-square)](https://github.com/geosem42/filamentor/actions?query=workflow%3Arun-tests+branch%3Amain)
[![GitHub Code Style Action Status](https://img.shields.io/github/actions/workflow/status/geosem42/filamentor/fix-php-code-styling.yml?branch=main&label=code%20style&style=flat-square)](https://github.com/geosem42/filamentor/actions?query=workflow%3A"Fix+PHP+code+styling"+branch%3Amain)
[![Total Downloads](https://img.shields.io/packagist/dt/geosem42/filamentor.svg?style=flat-square)](https://packagist.org/packages/geosem42/filamentor)



This is where your description should go. Limit it to a paragraph or two. Consider adding a small example.

## Installation

You can install the package via composer:

```bash
composer require geosem42/filamentor
```

You can publish and run the migrations with:

```bash
php artisan vendor:publish --tag="filamentor-migrations"
php artisan migrate
```

You can publish the config file with:

```bash
php artisan vendor:publish --tag="filamentor-config"
```

Optionally, you can publish the views using

```bash
php artisan vendor:publish --tag="filamentor-views"
```

This is the contents of the published config file:

```php
return [
];
```

## Usage

```php
$filamentor = new Geosem42\Filamentor();
echo $filamentor->echoPhrase('Hello, Geosem42!');
```

## Testing

```bash
composer test
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [George](https://github.com/geosem42)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
