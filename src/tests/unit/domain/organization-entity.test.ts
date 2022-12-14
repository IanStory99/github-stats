import { OrganizationEntity, TeamEntity } from "@/domain/entities";

describe("OrganizationEntity", () => {
  const mockMembers = new Set([
    {
      getId: jest.fn(),
    },
    {
      getId: jest.fn(),
    }
  ]);

  const mockTeams = [{
    getMembers: jest.fn()
  }];

  describe("getUsers", () => {
    it("should return an array of users", () => {
      mockTeams[0].getMembers.mockReturnValue(mockMembers);
      const organization = new OrganizationEntity("id", "name", [], mockTeams as unknown as TeamEntity[]);
      expect(organization.getUsers()).toEqual(mockMembers);
    });
  });

  describe("findUserById", () => {
    it("should return the user with the given id", () => {
      mockTeams[0].getMembers.mockReturnValue(mockMembers);
      mockMembers.values().next().value.getId.mockReturnValue("user1");
      const organization = new OrganizationEntity("id", "name", [], mockTeams as unknown as TeamEntity[]);
      expect(organization.findUserById("user1")).toEqual(mockMembers.values().next().value);
    });

    it("should return undefined if no user with the given id exists", () => {
      mockTeams[0].getMembers.mockReturnValue(mockMembers);
      mockMembers.values().next().value.getId.mockReturnValue("user1");
      const organization = new OrganizationEntity("id", "name", [], mockTeams as unknown as TeamEntity[]);
      expect(organization.findUserById("user3")).toBeUndefined();
    });

    it("should return undefined if no teams exist", () => {
      const organization = new OrganizationEntity("id", "name", [], []);
      expect(organization.findUserById("user1")).toBeUndefined();
    });

  });
});