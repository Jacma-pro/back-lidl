import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Connexion (client, préparateur ou manager)' })
  @ApiBody({
    schema: {
      example: { email: 'emma.durand@example.com', password: 'client123' },
    },
  })
  @ApiResponse({ status: 200, description: 'Connexion réussie — retourne un access_token JWT' })
  @ApiResponse({ status: 401, description: 'Identifiants invalides' })
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('register')
  @ApiOperation({ summary: 'Créer un compte client' })
  @ApiBody({
    schema: {
      example: {
        last_name: 'Dupont',
        first_name: 'Marie',
        email: 'marie.dupont@example.com',
        password: 'monMotDePasse',
        phone: '0612345678',
        address: '3 rue des Lilas, Lyon',
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Compte créé — retourne un access_token JWT' })
  @ApiResponse({ status: 409, description: 'Email déjà utilisé' })
  register(
    @Body()
    body: {
      last_name: string;
      first_name: string;
      email: string;
      password: string;
      phone: string;
      address: string;
    },
  ) {
    return this.authService.register(body);
  }
}
