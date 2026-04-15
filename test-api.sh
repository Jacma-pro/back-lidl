#!/bin/bash

BASE="http://localhost:3000/api"
OK=0
FAIL=0

check() {
  local url="$BASE/$1"
  local status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [ "$status" = "200" ]; then
    echo "✓ GET /$1 → $status"
    OK=$((OK+1))
  else
    echo "✗ GET /$1 → $status"
    FAIL=$((FAIL+1))
  fi
}

echo "=== Test tous les GET ==="
echo ""

# Listes
check "product"
check "category"
check "store"
check "permission"
check "client"
check "client-account"
check "client-history"
check "preparer"
check "manager"
check "stock"
check "pickup-slot"
check "cart"
check "cart-item"
check "order"
check "order-item"
check "substitution-proposal"
check "payment"
check "schedule"
check "performance"
check "notification"
check "audit-log"

echo ""
echo "=== Test GET par ID (id=1) ==="
echo ""

# Par ID
check "product/1"
check "category/1"
check "store/1"
check "permission/1"
check "client/1"
check "client-account/1"
check "client-history/1"
check "preparer/1"
check "manager/1"
check "stock/1"
check "pickup-slot/1"
check "cart/1"
check "cart-item/1"
check "order/1"
check "order-item/1"
check "substitution-proposal/1"
check "payment/1"
check "schedule/1"
check "performance/1"
check "notification/1"
check "audit-log/1"

echo ""
echo "=== Résultat : $OK OK / $FAIL erreurs ==="
