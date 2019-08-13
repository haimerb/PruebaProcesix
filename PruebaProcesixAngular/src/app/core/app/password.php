<?php

class Password {

    const SALT='SALT';
    
    static function hash($password) {
        return hash('sha512', self::SALT . $password);
    }
    static function verify($password, $hash) {
        return ($hash == self::hash($password));
    }
}


?>