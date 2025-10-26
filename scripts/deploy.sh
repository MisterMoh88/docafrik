#!/bin/bash

# Script de déploiement DocAfrik
# Usage: ./scripts/deploy.sh [environment]

set -e

# Configuration
ENVIRONMENT=${1:-production}
APP_NAME="docafrik"
DOCKER_COMPOSE_FILE="docker-compose.prod.yml"
BACKUP_DIR="./backups"
LOG_DIR="./logs"

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonctions de log
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérification des prérequis
check_prerequisites() {
    log_info "Vérification des prérequis..."
    
    # Vérifier Docker
    if ! command -v docker &> /dev/null; then
        log_error "Docker n'est pas installé"
        exit 1
    fi
    
    # Vérifier Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose n'est pas installé"
        exit 1
    fi
    
    # Vérifier les fichiers nécessaires
    if [ ! -f "$DOCKER_COMPOSE_FILE" ]; then
        log_error "Fichier $DOCKER_COMPOSE_FILE non trouvé"
        exit 1
    fi
    
    if [ ! -f ".env.local" ]; then
        log_warning "Fichier .env.local non trouvé, utilisation des valeurs par défaut"
    fi
    
    log_success "Prérequis vérifiés"
}

# Création des dossiers nécessaires
create_directories() {
    log_info "Création des dossiers nécessaires..."
    
    mkdir -p "$BACKUP_DIR"
    mkdir -p "$LOG_DIR"
    mkdir -p "./db"
    mkdir -p "./nginx/ssl"
    
    log_success "Dossiers créés"
}

# Sauvegarde des données
backup_data() {
    log_info "Sauvegarde des données existantes..."
    
    if [ -f "./db/custom.db" ]; then
        BACKUP_FILE="$BACKUP_DIR/custom-$(date +%Y%m%d-%H%M%S).db"
        cp "./db/custom.db" "$BACKUP_FILE"
        log_success "Base de données sauvegardée: $BACKUP_FILE"
    else
        log_info "Aucune base de données à sauvegarder"
    fi
}

# Construction de l'image Docker
build_image() {
    log_info "Construction de l'image Docker..."
    
    docker-compose -f "$DOCKER_COMPOSE_FILE" build --no-cache
    
    log_success "Image Docker construite"
}

# Déploiement de l'application
deploy_app() {
    log_info "Déploiement de l'application..."
    
    # Arrêter les conteneurs existants
    docker-compose -f "$DOCKER_COMPOSE_FILE" down || true
    
    # Démarrer les nouveaux conteneurs
    docker-compose -f "$DOCKER_COMPOSE_FILE" up -d
    
    log_success "Application déployée"
}

# Vérification du déploiement
verify_deployment() {
    log_info "Vérification du déploiement..."
    
    # Attendre que l'application démarre
    sleep 30
    
    # Vérifier que les conteneurs sont en cours d'exécution
    if ! docker-compose -f "$DOCKER_COMPOSE_FILE" ps | grep -q "Up"; then
        log_error "Les conteneurs ne sont pas en cours d'exécution"
        docker-compose -f "$DOCKER_COMPOSE_FILE" logs
        exit 1
    fi
    
    # Vérifier l'health check
    for i in {1..10}; do
        if curl -f http://localhost:3000/api/health &> /dev/null; then
            log_success "Health check réussi"
            break
        fi
        
        if [ $i -eq 10 ]; then
            log_error "Health check échoué après 10 tentatives"
            docker-compose -f "$DOCKER_COMPOSE_FILE" logs
            exit 1
        fi
        
        log_info "Attente de l'application... ($i/10)"
        sleep 10
    done
    
    log_success "Déploiement vérifié avec succès"
}

# Nettoyage
cleanup() {
    log_info "Nettoyage des anciennes images..."
    
    docker image prune -f
    
    log_success "Nettoyage terminé"
}

# Affichage des informations
show_info() {
    log_success "Déploiement terminé avec succès !"
    echo
    echo "🌐 Application disponible: http://localhost:3000"
    echo "📊 Logs: docker-compose -f $DOCKER_COMPOSE_FILE logs -f"
    echo "🛠️  Arrêter: docker-compose -f $DOCKER_COMPOSE_FILE down"
    echo "🔄 Redémarrer: docker-compose -f $DOCKER_COMPOSE_FILE restart"
    echo
    echo "📋 Informations système:"
    docker-compose -f "$DOCKER_COMPOSE_FILE" ps
}

# Fonction principale
main() {
    log_info "Déploiement de DocAfrik en environnement: $ENVIRONMENT"
    echo
    
    check_prerequisites
    create_directories
    backup_data
    build_image
    deploy_app
    verify_deployment
    cleanup
    show_info
}

# Gestion des erreurs
trap 'log_error "Une erreur est survenue pendant le déploiement"; exit 1' ERR

# Exécution
main "$@"