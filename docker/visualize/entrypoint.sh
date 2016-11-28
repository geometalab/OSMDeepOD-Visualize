#!/bin/bash

/usr/bin/supervisord

exec "$@"
