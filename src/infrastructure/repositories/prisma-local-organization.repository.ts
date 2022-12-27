import { LocalOrganizationRepositoryInterface } from '@/domain/interfaces/repositories';
import { OrganizationInputDto } from '@/application/dtos';
import { PrismaClient } from '@prisma/client';
import { OrganizationEntity } from "@/domain/entities"
import {
  PrismaToDomainOrganizationMapper,
  DomainOrganizationToPrismaCreateMapper,
  DomainOrganizationToPrismaUpdateMapper
} from "@/infrastructure/mappers"

class PrismaLocalOrganizationRepository implements LocalOrganizationRepositoryInterface {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findById(organizationDTO: OrganizationInputDto): Promise<OrganizationEntity> {
    const organization = await this.prisma.organization.findUnique({
      where: {
        ID: organizationDTO.name
      },
      include: {
        REPOSITORIES: {
          include: {
            PULLREQS: {
              include: {
                COMMITS: true,
                REVIEWS: {
                  include: {
                    REVIEW_COMMENTS: true
                  }
                }
              }
            },
          }
        },
        TEAMS: {
          include: {
            MEMBERS: true
          }
        }
      }
    });

    if (!organization) {
      return null;
    }

    return PrismaToDomainOrganizationMapper.map(organization);
  }

  async persist(organization: OrganizationEntity): Promise<void> {
    await this.prisma.organization.upsert({
      where: {
        ID: organization.getId(),
      },
      create: DomainOrganizationToPrismaCreateMapper.map(organization),
      update: DomainOrganizationToPrismaUpdateMapper.map(organization)
    });
  }
}

export default PrismaLocalOrganizationRepository;
