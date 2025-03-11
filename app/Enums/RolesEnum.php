<?php

namespace App\Enums;

enum RolesEnum: string
{
    case Admin = 'admin';
    case Masyarakat = 'masyarakat';
    case Kabalai = 'kabalai';

    public static function labels(): array
    {
        return [
            self::Admin->value => 'Admin',
            self::Masyarakat->value => 'Masyarakat',
            self::Kabalai->value => 'Kabalai',
        ];
    }

    public function label()
    {
        return match($this) {
            self::Admin => 'Admin',
            self::Masyarakat => 'Masyarakat',
            self::Kabalai => 'Kabalai',
        };
    }
}
